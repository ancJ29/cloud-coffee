import Message from '@/components/c-time-keeper/Message'
import { BUCKET_NAME, IS_DEV } from '@/configs/constant'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import {
  checkInByUser,
  checkOutByUser,
  getAllUsersByAdmin,
  getAllVenuesByAdmin,
  getClientByDomain,
  uploadImageToS3,
  User,
  Venue,
} from '@/services/domain'
import { getImageUrl, getObjectKey, ONE_SECOND } from '@/utils'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CheckInView from './components/CheckInView'
import UserSelector from './components/UserSelector'
import WorkEntryView from './components/WorkEntryView'

const MODAL_CLOSE_DELAY = 1.5 * ONE_SECOND
const MAX_PAGE_INDEX = 3

export default function WorkEntry() {
  const t = useTranslation()
  const domain = IS_DEV ? import.meta.env.VITE_DOMAIN : window.location.hostname
  const [searchParams] = useSearchParams()
  const venueId = searchParams.get('venueId') || ''
  const [pageIndex, setPageIndex] = useState(0)
  const [venues, setVenues] = useState<Record<string, Venue>>({})
  const [users, setUsers] = useState<Record<string, User>>({})
  const [clientId, setClientId] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [isCheckIn, setIsCheckIn] = useState(true)

  const getData = useCallback(async () => {
    const clientId = await getClientByDomain({ domain }).then((res) => res?.id)

    if (clientId) {
      const [venues, users] = await Promise.all([
        getAllVenuesByAdmin({ clientId }),
        getAllUsersByAdmin({ clientId }),
      ])
      setVenues(Object.fromEntries(venues.map((venue) => [venue.id, venue])))
      setUsers(Object.fromEntries(users.map((user) => [user.id, user])))
      setClientId(clientId)
    }
  }, [domain])
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

  const handleChoseUser = useCallback(
    (userId: string) => {
      setSelectedUserId(userId)
      modals.closeAll()
      goToNextPage()
    },
    [goToNextPage],
  )

  const submit = useCallback(
    async (file: File) => {
      let success: boolean | undefined
      const objectKey = getObjectKey(clientId, selectedUserId, file, isCheckIn)
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
          userId: selectedUserId,
          venueId,
          startImageUrl: uploadResult.success ? imageUrl : undefined,
        })
        success = res?.success
      } else {
        const res = await checkOutByUser({
          clientId,
          userId: selectedUserId,
          endImageUrl: uploadResult.success ? imageUrl : undefined,
        })
        success = res?.success
      }
      modals.open({
        withCloseButton: false,
        centered: true,
        size: 'lg',
        closeOnEscape: false,
        closeOnClickOutside: false,
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
      setTimeout(() => {
        setPageIndex(0)
        modals.closeAll()
      }, MODAL_CLOSE_DELAY)
    },
    [clientId, isCheckIn, selectedUserId, t, venueId],
  )

  return (
    <>
      {pageIndex === 0 && (
        <WorkEntryView
          onCheckIn={handleCheckInCheckOut}
          onCheckOut={() => handleCheckInCheckOut(false)}
        />
      )}
      {pageIndex === 1 && (
        <UserSelector
          isCheckIn={isCheckIn}
          users={users}
          onClick={(userId) => handleChoseUser(userId)}
          onReturn={goToPreviousPage}
        />
      )}
      {pageIndex === 2 && (
        <CheckInView
          venues={venues}
          user={users[selectedUserId]}
          venueId={venueId}
          onSubmit={submit}
        />
      )}
    </>
  )
}
