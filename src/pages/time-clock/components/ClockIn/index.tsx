import Message from '@/components/c-time-keeper/Message'
import { BUCKET_NAME, IS_DEV, PLACEHOLDER_IMAGE_URL } from '@/configs/constant'
import { useGeoLocation } from '@/hooks/useGeoLocation'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import {
  checkInByUser,
  checkOutByUser,
  getAllShiftsByAdmin,
  getAllUsersByAdmin,
  getClientByDomain,
  Shift,
  uploadImageToS3,
  User,
} from '@/services/domain'
import { endOfDay, getImageUrl, getObjectKey, startOfDay } from '@/utils'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CheckInView from './CheckInView'
import ClosePopup from './ClosePopup'
import LocationDeniedNotice from './LocationDeniedNotice'
import StatusMessage from './StatusMessage'
import WebcamView from './WebcamView'

const MAX_PAGE_INDEX = 1

export default function ClockIn() {
  const t = useTranslation()
  const { address, location, denied } = useGeoLocation()
  const domain = IS_DEV ? import.meta.env.VITE_DOMAIN : window.location.hostname
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const [user, setUser] = useState<User | undefined>(undefined)
  const [shifts, setShifts] = useState<Shift[]>([])
  const [clientId, setClientId] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [isCheckIn, setIsCheckIn] = useState(true)
  const [isCheckedOut, setIsCheckedOut] = useState(false)
  const [zIndex, setZIndex] = useState(-1)
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  const getShiftData = useCallback(
    async (clientId: string) => {
      const shifts = await getAllShiftsByAdmin({
        clientId,
        userId,
        start: startOfDay(Date.now()),
        end: endOfDay(Date.now()),
      })
      if (shifts) {
        setShifts(shifts)
        const lastShift = shifts[shifts.length - 1]
        setIsCheckedOut(!!lastShift?.end)
      }
    },
    [userId],
  )

  const getData = useCallback(async () => {
    const clientId = await getClientByDomain({ domain }).then((res) => res?.id)
    if (clientId) {
      setClientId(clientId)
      const [users] = await Promise.all([
        getAllUsersByAdmin({ id: userId, clientId }),
        getShiftData(clientId),
      ])
      if (users.length > 0) {
        setUser(users[0])
      }
    }
  }, [domain, getShiftData, userId])
  useMount(getData)

  const goToNextPage = useCallback(() => {
    setPageIndex((prev) => (prev < MAX_PAGE_INDEX ? prev + 1 : prev))
  }, [])

  const goToPreviousPage = useCallback(() => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const submit = useCallback(
    async (file: File) => {
      if (!location) {
        modals.open({
          centered: true,
          size: 'lg',
          children: (
            <Message
              success={false}
              message={t(
                'We could not access your location. Please make sure you have granted location access in your browser settings',
              )}
            />
          ),
        })
        return
      }

      let success: boolean | undefined
      const objectKey = getObjectKey(clientId, userId, file, isCheckIn)
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
          userId,
          startImageUrl: uploadResult.success ? imageUrl : PLACEHOLDER_IMAGE_URL,
          ...location,
        })
        success = res?.success
      } else {
        const res = await checkOutByUser({
          clientId,
          userId,
          endImageUrl: uploadResult.success ? imageUrl : PLACEHOLDER_IMAGE_URL,
          ...location,
        })
        success = res?.success
      }
      setZIndex(9999)
      setSuccess(success)
      modals.open({
        withCloseButton: false,
        centered: true,
        size: 'lg',
        overlayProps: {
          backgroundOpacity: 0.55,
          blur: 3,
        },
        closeOnClickOutside: false,
        children: <StatusMessage success={success} timestamp={new Date()} address={address} />,
      })
    },
    [address, clientId, isCheckIn, location, t, userId],
  )

  const handleCheckInCheckOut = useCallback(
    (isCheckIn = true) => {
      setIsCheckIn(isCheckIn)
      goToNextPage()
    },
    [goToNextPage],
  )

  const closePopup = useCallback(async () => {
    setZIndex(-1)
    modals.closeAll()
    if (success) {
      setPageIndex(0)
    }
    await getShiftData(clientId)
  }, [clientId, getShiftData, success])

  if (denied) {
    return <LocationDeniedNotice />
  }

  return (
    <>
      {pageIndex === 0 && (
        <CheckInView
          isCheckedOut={isCheckedOut}
          user={user}
          shifts={shifts}
          onCheckIn={handleCheckInCheckOut}
          onCheckOut={() => handleCheckInCheckOut(false)}
        />
      )}
      {pageIndex === 1 && (
        <WebcamView isCheckedOut={isCheckedOut} onSubmit={submit} onReturn={goToPreviousPage} />
      )}
      <ClosePopup zIndex={zIndex} onClick={closePopup} />
    </>
  )
}
