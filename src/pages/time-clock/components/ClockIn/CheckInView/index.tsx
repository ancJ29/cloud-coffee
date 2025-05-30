import LiveClock from '@/components/c-time-keeper/LiveClock'
import { Shift, User } from '@/services/domain'
import { Image, Stack } from '@mantine/core'
import Actions from './Actions'
import Address from './Address'
import Header from './Header'
import ShiftInformation from './ShiftInformation'

type CheckInViewProps = {
  user?: User
  shifts: Shift[]
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function CheckInView({ user, shifts, onCheckIn, onCheckOut }: CheckInViewProps) {
  const isCheckedIn = shifts.length > 0 ? !(shifts[shifts.length - 1]?.end !== undefined) : false

  return (
    <Stack h="100%" align="center" justify="center" gap={30} px={20}>
      <Header user={user} />
      <Image
        w={200}
        src={
          isCheckedIn ? shifts[shifts.length - 1]?.startImageUrl : '/imgs/time-clock/default.svg'
        }
        radius="50%"
      />
      <Stack gap={5} align="center">
        <LiveClock
          c={`${isCheckedIn ? 'var(--time-clock-secondary-color)' : 'var(--time-clock-primary-color)'}`}
        />
        <Address />
      </Stack>
      <Actions isCheckedIn={isCheckedIn} onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <ShiftInformation shifts={shifts} />
    </Stack>
  )
}
