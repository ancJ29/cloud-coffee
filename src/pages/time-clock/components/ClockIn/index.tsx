import { BUCKET_NAME, IS_DEV, PLACEHOLDER_IMAGE_URL } from '@/configs/constant'
import { pushNotification } from '@/configs/notifications'
import { useGeoLocation } from '@/hooks/useGeoLocation'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import {
  AttendanceLog,
  checkInByUser,
  checkOutByUser,
  getAllAttendanceLogsByAdmin,
  getAllUsersByAdmin,
  getClientByDomain,
  uploadImageToS3,
  User,
} from '@/services/domain'
import { NotificationType } from '@/types'
import { endOfDay, getImageUrl, getObjectKey, startOfDay } from '@/utils'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import CheckInView from './CheckInView'
import ClosePopup from './ClosePopup'
import LocationDeniedNotice from './LocationDeniedNotice'
import StatusMessage from './StatusMessage'
import WebcamView from './WebcamView'

const MAX_PAGE_INDEX = 1

type ClockInProps = {
  publicId: string
}

export default function ClockIn({ publicId }: ClockInProps) {
  const t = useTranslation()
  const { address, location, denied } = useGeoLocation()
  const domain = IS_DEV ? import.meta.env.VITE_DOMAIN : window.location.hostname
  const [user, setUser] = useState<User | undefined>(undefined)
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([])
  const [clientId, setClientId] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [isCheckIn, setIsCheckIn] = useState(true)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [isCheckSuccessful, setIsCheckSuccessful] = useState<boolean | undefined>(undefined)
  const [key, setKey] = useState(0)
  const [isDisplayCloseButton, setIsDisplayCloseButton] = useState(false)

  const getAttendanceLogData = useCallback(async (clientId: string, userId: string) => {
    const attendanceLogs = await getAllAttendanceLogsByAdmin({
      clientId,
      userId,
      start: startOfDay(Date.now()),
      end: endOfDay(Date.now()),
      delay: 600,
    })
    if (attendanceLogs) {
      setAttendanceLogs(attendanceLogs)
      setIsCheckedIn(
        attendanceLogs.length > 0 && attendanceLogs[attendanceLogs.length - 1].end === undefined,
      )
    }
  }, [])

  const getData = useCallback(async () => {
    const clientId = await getClientByDomain({ domain }).then((res) => res?.id)
    if (clientId) {
      setClientId(clientId)
      const users = await getAllUsersByAdmin({ publicId, clientId })
      if (users.length > 0) {
        await getAttendanceLogData(clientId, users[0].id)
        setUser(users[0])
      }
    }
  }, [domain, getAttendanceLogData, publicId])
  useMount(getData)

  const goToNextPage = useCallback(() => {
    setPageIndex((prev) => (prev < MAX_PAGE_INDEX ? prev + 1 : prev))
  }, [])

  const goToPreviousPage = useCallback(() => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const handleCheckInCheckOut = useCallback(
    (isCheckIn = true) => {
      setIsCheckIn(isCheckIn)
      goToNextPage()
    },
    [goToNextPage],
  )

  const closePopup = useCallback(async () => {
    setIsDisplayCloseButton(false)
    modals.closeAll()
    if (isCheckSuccessful) {
      setPageIndex(0)
    } else {
      setKey((prev) => prev + 1)
    }
    await getAttendanceLogData(clientId, user?.id || '')
  }, [clientId, getAttendanceLogData, isCheckSuccessful, user?.id])

  const submit = useCallback(
    async (file: File) => {
      if (!location) {
        pushNotification({
          type: NotificationType.ERROR,
          message: t(
            'We could not access your location. Please make sure you have granted location access in your browser settings',
          ),
        })
        return
      }

      let success: boolean | undefined
      let message: string | undefined
      const objectKey = getObjectKey(clientId, user?.id || '', file, isCheckIn)
      const imageUrl = getImageUrl(objectKey)
      const uploadResult = await uploadImageToS3({
        bucketName: BUCKET_NAME,
        objectKey,
        clientId,
        file,
      })

      if (isCheckIn) {
        const res = await checkInByUser({
          clientId,
          userId: user?.id || '',
          startImageUrl: uploadResult.success ? imageUrl : PLACEHOLDER_IMAGE_URL,
          ...location,
          delay: 400,
        })
        success = res?.success
        message = res?.message
      } else {
        const res = await checkOutByUser({
          clientId,
          userId: user?.id || '',
          endImageUrl: uploadResult.success ? imageUrl : PLACEHOLDER_IMAGE_URL,
          ...location,
          delay: 400,
        })
        success = res?.success
        message = res?.message
      }
      setIsDisplayCloseButton(true)
      setIsCheckSuccessful(success)
      modals.open({
        withCloseButton: false,
        centered: true,
        size: 'lg',
        overlayProps: {
          backgroundOpacity: 0.6,
          blur: 5,
        },
        closeOnClickOutside: false,
        children: (
          <StatusMessage
            success={success}
            message={message}
            timestamp={new Date()}
            address={address}
          />
        ),
      })
    },
    [address, clientId, isCheckIn, location, t, user?.id],
  )

  if (denied) {
    return <LocationDeniedNotice />
  }

  return (
    <>
      {pageIndex === 0 && (
        <CheckInView
          isCheckedIn={isCheckedIn}
          user={user}
          attendanceLogs={attendanceLogs}
          onCheckIn={handleCheckInCheckOut}
          onCheckOut={() => handleCheckInCheckOut(false)}
        />
      )}
      {pageIndex === 1 && (
        <WebcamView
          key={key}
          isCheckedIn={isCheckedIn}
          onSubmit={submit}
          onReturn={goToPreviousPage}
        />
      )}
      <ClosePopup isDisplay={isDisplayCloseButton} onClick={closePopup} />
    </>
  )
}
