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
import { endOfDay, getImageUrl, getObjectKey, ONE_SECOND, startOfDay } from '@/utils'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CheckInView from './CheckInView'
import LocationDeniedNotice from './LocationDeniedNotice'
import WebcamView from './WebcamView'

const MAX_PAGE_INDEX = 1
const MODAL_CLOSE_DELAY = 1.5 * ONE_SECOND

export default function ClockIn() {
  const t = useTranslation()
  const domain = IS_DEV ? import.meta.env.VITE_DOMAIN : window.location.hostname
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const [user, setUser] = useState<User | undefined>(undefined)
  const [shifts, setShifts] = useState<Shift[]>([])
  const [clientId, setClientId] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [isCheckIn, setIsCheckIn] = useState(true)
  const { location, denied } = useGeoLocation()

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
      modals.open({
        withCloseButton: false,
        centered: true,
        size: 'lg',
        children: (
          <Message
            success={success}
            message={
              success
                ? t(`Checked ${isCheckIn ? 'in' : 'out'} successfully`)
                : t(`Failed to check ${isCheckIn ? 'in' : 'out'}`)
            }
          />
        ),
      })
      await getShiftData(clientId)
      setTimeout(() => {
        setPageIndex(0)
        modals.closeAll()
      }, MODAL_CLOSE_DELAY)
    },
    [clientId, getShiftData, isCheckIn, location, t, userId],
  )

  const handleCheckInCheckOut = useCallback(
    (isCheckIn = true) => {
      setIsCheckIn(isCheckIn)
      goToNextPage()
    },
    [goToNextPage],
  )

  if (denied) {
    return <LocationDeniedNotice />
  }

  return (
    <>
      {pageIndex === 0 && (
        <CheckInView
          user={user}
          shifts={shifts}
          onCheckIn={handleCheckInCheckOut}
          onCheckOut={() => handleCheckInCheckOut(false)}
        />
      )}
      {pageIndex === 1 && <WebcamView onSubmit={submit} onReturn={goToPreviousPage} />}
    </>
  )
}
