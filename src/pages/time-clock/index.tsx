import { useState } from 'react'
import { Tabs } from './_configs'
import TimeClockView from './components/TimeClockView'

export default function TimeClock() {
  const [selectedTab, setSelectedTab] = useState(Tabs.TIME_CLOCK)
  // const t = useTranslation()
  // const [searchParams] = useSearchParams()
  // const userId = searchParams.get('userId') || ''
  // const clientId = searchParams.get('clientId') || ''
  // // TODO: get location instead of hardcode
  // const venueId = searchParams.get('venueId') || ''
  // const [user, setUser] = useState<User | undefined>(undefined)
  // const [shifts, setShifts] = useState<Shift[]>([])

  // const getShiftData = useCallback(async () => {
  //   const shifts = await getShiftsByAdmin({ clientId, userId, start: startOfDay(Date.now()) })
  //   if (shifts) {
  //     setShifts(shifts)
  //   }
  // }, [clientId, userId])

  // const getData = useCallback(async () => {
  //   const [users] = await Promise.all([
  //     getAllUsersByAdmin({ id: userId, clientId }),
  //     getShiftData(),
  //   ])
  //   if (users.length > 0) {
  //     setUser(users[0])
  //   }
  // }, [clientId, getShiftData, userId])
  // useMount(getData)

  // const handleCheckIn = useCallback(async () => {
  //   const res = await checkInByUser({ clientId, userId, venueId })
  //   const success = res?.success
  //   modals.open({
  //     withCloseButton: false,
  //     centered: true,
  //     size: 'lg',
  //     children: (
  //       <Message
  //         success={success}
  //         message={success ? t('Checked in successfully') : t('Failed to check in')}
  //       />
  //     ),
  //   })
  //   await getShiftData()
  // }, [clientId, getShiftData, t, userId, venueId])

  // const handleCheckOut = useCallback(async () => {
  //   const res = await checkOutByUser({ clientId, userId })
  //   const success = res?.success
  //   modals.open({
  //     withCloseButton: false,
  //     centered: true,
  //     size: 'lg',
  //     children: (
  //       <Message
  //         success={success}
  //         message={success ? t('Checked out successfully') : t('Failed to check out')}
  //       />
  //     ),
  //   })
  //   await getShiftData()
  // }, [clientId, getShiftData, t, userId])

  return (
    <TimeClockView
      selectedTab={selectedTab}
      onChangeSelectedTab={setSelectedTab}
      // user={user}
      // shifts={shifts}
      // onCheckIn={handleCheckIn}
      // onCheckOut={handleCheckOut}
    />
  )
}
