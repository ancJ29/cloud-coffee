import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { checkInByUser, checkOutByUser, getAllUsersByAdmin, User } from '@/services/domain'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CheckInView from './components/CheckInView'
import Message from './components/Message'
import WorkEntryForm from './components/WorkEntryForm'
import WorkEntryView from './components/WorkEntryView'

const MODAL_CLOSE_DELAY = 1500

export default function WorkEntry() {
  const t = useTranslation()
  const [searchParams] = useSearchParams()
  const venueId = searchParams.get('venueId') || ''
  const clientId = searchParams.get('clientId') || ''
  const [page, setPage] = useState(0)
  const [users, setUsers] = useState<Record<string, User>>({})
  const [selectedUserId, setSelectedUserId] = useState('')
  const [isCheckIn, setIsCheckIn] = useState(true)

  const getData = useCallback(async () => {
    const users = await getAllUsersByAdmin({ clientId })
    setUsers(Object.fromEntries(users.map((user) => [user.id, user])))
  }, [clientId])
  useMount(getData)

  const handleChoseUser = useCallback((userId: string) => {
    setSelectedUserId(userId)
    modals.closeAll()
    setPage(1)
  }, [])

  const handleCheckInCheckOut = useCallback(
    (isCheckIn = true) => {
      setIsCheckIn(isCheckIn)
      modals.open({
        title: isCheckIn ? t('Check in') : t('Check out'),
        centered: true,
        fullScreen: true,
        children: <WorkEntryForm users={users} onClick={(userId) => handleChoseUser(userId)} />,
      })
    },
    [handleChoseUser, t, users],
  )

  const submit = useCallback(async () => {
    if (isCheckIn) {
      const res = await checkInByUser({ clientId, userId: selectedUserId, venueId: venueId || '' })
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
      setPage(0)
      modals.closeAll()
    }, MODAL_CLOSE_DELAY)
  }, [clientId, isCheckIn, selectedUserId, t, venueId])

  const renderPage = () => {
    if (page === 0) {
      return (
        <WorkEntryView
          onCheckIn={handleCheckInCheckOut}
          onCheckOut={() => handleCheckInCheckOut(false)}
        />
      )
    }

    if (page === 1) {
      return <CheckInView user={users[selectedUserId]} onSubmit={submit} />
    }

    return <></>
  }

  return <>{renderPage()}</>
}
