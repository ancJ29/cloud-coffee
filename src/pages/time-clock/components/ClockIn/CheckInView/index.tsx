import LiveClock from '@/components/c-time-keeper/LiveClock'
import { PLACEHOLDER_IMAGE_URL } from '@/configs/constant'
import { Shift, User } from '@/services/domain'
import { Image, Stack } from '@mantine/core'
import Actions from './Actions'
import Address from './Address'
import Header from './Header'
import ShiftInformation from './ShiftInformation'

type CheckInViewProps = {
  isCheckedIn: boolean
  user?: User
  shifts: Shift[]
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function CheckInView({
  isCheckedIn,
  user,
  shifts,
  onCheckIn,
  onCheckOut,
}: CheckInViewProps) {
  return (
    <Stack h="100%" align="center" justify="center" gap={30} px={20}>
      <Header user={user} />
      <Image
        w={200}
        src={
          isCheckedIn
            ? (shifts[shifts.length - 1]?.startImageUrl ?? PLACEHOLDER_IMAGE_URL)
            : '/imgs/time-clock/default.svg'
        }
        radius="50%"
      />
      <Stack gap={8} align="center">
        <LiveClock c={isCheckedIn ? 'var(--time-clock-live-clock)' : 'var(--time-clock-primary)'} />
        <Address />
      </Stack>
      <Actions isCheckedIn={isCheckedIn} onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <ShiftInformation shifts={shifts} />
    </Stack>
  )
}
