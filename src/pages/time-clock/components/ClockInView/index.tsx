import Message from '@/components/c-time-keeper/Message'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import {
  checkInByUser,
  checkOutByUser,
  getAllUsersByAdmin,
  getShiftsByAdmin,
  Shift,
  User,
} from '@/services/domain'
import { startOfDay } from '@/utils'
import { Stack } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CheckInView from './CheckInView'
import WebcamView from './WebcamView'

const MAX_PAGE_INDEX = 1
const MODAL_CLOSE_DELAY = 1500

export default function ClockInView() {
  const t = useTranslation()
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const clientId = searchParams.get('clientId') || ''
  // TODO: get location instead of hardcode
  const venueId = searchParams.get('venueId') || ''
  const [user, setUser] = useState<User | undefined>(undefined)
  const [shifts, setShifts] = useState<Shift[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [isCheckIn, setIsCheckIn] = useState(true)

  const getShiftData = useCallback(async () => {
    const shifts = await getShiftsByAdmin({ clientId, userId, start: startOfDay(Date.now()) })
    if (shifts) {
      setShifts(shifts)
    }
  }, [clientId, userId])

  const getData = useCallback(async () => {
    const [users] = await Promise.all([
      getAllUsersByAdmin({ id: userId, clientId }),
      getShiftData(),
    ])
    if (users.length > 0) {
      setUser(users[0])
    }
  }, [clientId, getShiftData, userId])
  useMount(getData)

  const goToNextPage = useCallback(() => {
    setPageIndex((prev) => (prev < MAX_PAGE_INDEX ? prev + 1 : prev))
  }, [])

  const submit = useCallback(async () => {
    if (isCheckIn) {
      const res = await checkInByUser({ clientId, userId, venueId })
      const success = res?.success
      modals.open({
        withCloseButton: false,
        centered: true,
        size: 'lg',
        children: (
          <Message
            success={success}
            message={success ? t('Checked in successfully') : t('Failed to check in')}
          />
        ),
      })
    } else {
      const res = await checkOutByUser({ clientId, userId })
      const success = res?.success
      modals.open({
        withCloseButton: false,
        centered: true,
        size: 'lg',
        children: (
          <Message
            success={success}
            message={success ? t('Checked out successfully') : t('Failed to check out')}
          />
        ),
      })
    }
    await getShiftData()
    setTimeout(() => {
      setPageIndex(0)
      modals.closeAll()
    }, MODAL_CLOSE_DELAY)
  }, [clientId, getShiftData, isCheckIn, t, userId, venueId])

  const handleCheckInCheckOut = useCallback(
    (isCheckIn = true) => {
      setIsCheckIn(isCheckIn)
      goToNextPage()
    },
    [goToNextPage],
  )

  return (
    <Stack gap={40} align="center" justify="center" h="calc(100vh - 64px)">
      {pageIndex === 0 && (
        <CheckInView
          user={user}
          shifts={shifts}
          onCheckIn={handleCheckInCheckOut}
          onCheckOut={() => handleCheckInCheckOut(false)}
        />
      )}
      {pageIndex === 1 && <WebcamView user={user} onSubmit={submit} />}
    </Stack>
  )
}
