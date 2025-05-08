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
    <Stack gap={30} align="center" justify="center" h="100%">
      <Address />
      <Header user={user} />
      <Actions onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <ShiftInformation shifts={shifts} />
    </Stack>
  )
}
