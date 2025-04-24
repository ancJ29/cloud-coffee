import { Shift, User } from '@/services/domain'
import { Stack } from '@mantine/core'
import CheckInActions from '../CheckInActions'
import MobileOnlyWarning from '../MobileOnlyWarning'
import ShiftInformation from '../ShiftInformation'
import Title from '../Title'

type TimeClockViewProps = {
  user?: User
  shift?: Shift
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function TimeClockView({ user, shift, onCheckIn, onCheckOut }: TimeClockViewProps) {
  return (
    <>
      <MobileOnlyWarning />
      <Stack gap={20} align="center" hiddenFrom="sm" px={20}>
        <Title user={user} />
        <CheckInActions onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
        <ShiftInformation shift={shift} />
      </Stack>
    </>
  )
}
