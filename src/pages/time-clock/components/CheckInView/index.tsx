import { Shift, User } from '@/services/domain'
import { Stack } from '@mantine/core'
import Actions from './Actions'
import ShiftInformation from './ShiftInformation'
import Title from './Title'

export type CheckInViewProps = {
  user?: User
  shift?: Shift
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function CheckInView({ user, shift, onCheckIn, onCheckOut }: CheckInViewProps) {
  return (
    <Stack gap={20} align="center">
      <Title user={user} />
      <Actions onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <ShiftInformation shift={shift} />
    </Stack>
  )
}
