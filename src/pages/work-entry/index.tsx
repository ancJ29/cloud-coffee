import Message from '@/components/c-time-keeper/Message'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import {
  checkInByUser,
  checkOutByUser,
  getAllUsersByAdmin,
  getAllVenuesByAdmin,
  User,
  Venue,
} from '@/services/domain'
import { ONE_SECOND } from '@/utils'
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
  const [searchParams] = useSearchParams()
  const venueId = searchParams.get('venueId') || ''
  const clientId = searchParams.get('clientId') || ''
  const [pageIndex, setPageIndex] = useState(0)
  const [venues, setVenues] = useState<Record<string, Venue>>({})
  const [users, setUsers] = useState<Record<string, User>>({})
  const [selectedUserId, setSelectedUserId] = useState('')
  const [isCheckIn, setIsCheckIn] = useState(true)

  const getData = useCallback(async () => {
    const [venues, users] = await Promise.all([
      getAllVenuesByAdmin({ clientId }),
      getAllUsersByAdmin({ clientId }),
    ])
    setVenues(Object.fromEntries(venues.map((venue) => [venue.id, venue])))
    setUsers(Object.fromEntries(users.map((user) => [user.id, user])))
  }, [clientId])
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

  const submit = useCallback(async () => {
    if (isCheckIn) {
      const res = await checkInByUser({ clientId, userId: selectedUserId, venueId })
      const success = res?.success
      modals.open({
        withCloseButton: false,
        centered: true,
        size: 'lg',
        closeOnEscape: false,
        closeOnClickOutside: false,
        children: (
          <Message
            success={success}
            message={success ? t('Checked in successfully') : t('Failed to check in')}
          />
        ),
      })
    } else {
      const res = await checkOutByUser({ clientId, userId: selectedUserId })
      const success = res?.success
      modals.open({
        withCloseButton: false,
        centered: true,
        size: 'lg',
        closeOnEscape: false,
        closeOnClickOutside: false,
        children: (
          <Message
            success={success}
            message={success ? t('Checked out successfully') : t('Failed to check out')}
          />
        ),
      })
    }
    setTimeout(() => {
      setPageIndex(0)
      modals.closeAll()
    }, MODAL_CLOSE_DELAY)
  }, [clientId, isCheckIn, selectedUserId, t, venueId])

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
