import LiveClock from '@/components/c-time-keeper/LiveClock'
import Avatar from '@/components/common/Avatar'
import { Shift, User } from '@/services/domain'
import { Stack } from '@mantine/core'
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
  return (
    <Stack h="100%" align="center" justify="center" gap={20}>
      <Header user={user} />
      <Avatar size={200} src={user?.avatar} />
      <LiveClock c="var(--time-clock-primary-color)" />
      <Address />
      <Actions shifts={shifts} onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <ShiftInformation shifts={shifts} />
    </Stack>
  )
}
