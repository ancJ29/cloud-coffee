import LiveClock from '@/components/c-time-keeper/LiveClock'
import { PLACEHOLDER_IMAGE_URL } from '@/configs/constant'
import { Shift, User } from '@/services/domain'
import { Image, Stack } from '@mantine/core'
import Actions from './Actions'
import Address from './Address'
import Header from './Header'
import ShiftInformation from './ShiftInformation'

type CheckInViewProps = {
  isCheckedOut: boolean
  user?: User
  shifts: Shift[]
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function CheckInView({
  isCheckedOut,
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
          isCheckedOut
            ? (shifts[shifts.length - 1]?.startImageUrl ?? PLACEHOLDER_IMAGE_URL)
            : '/imgs/time-clock/default.svg'
        }
        radius="50%"
      />
      <Stack gap={8} align="center">
        <LiveClock
          c={
            isCheckedOut ? 'var(--time-clock-live-clock-color)' : 'var(--time-clock-primary-color)'
          }
        />
        <Address />
      </Stack>
      <Actions isCheckedOut={isCheckedOut} onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <ShiftInformation shifts={shifts} />
    </Stack>
  )
}
