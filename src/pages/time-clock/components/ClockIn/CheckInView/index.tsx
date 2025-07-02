import { LiveClock } from '@/components'
import { PLACEHOLDER_IMAGE_URL } from '@/configs/constant'
import { AttendanceLog, User } from '@/services/domain'
import { Image, Stack } from '@mantine/core'
import Address from '../Address'
import Actions from './Actions'
import AttendanceLogsInformation from './AttendanceLogsInformation'
import Header from './Header'

type CheckInViewProps = {
  isCheckedIn: boolean
  user?: User
  attendanceLogs: AttendanceLog[]
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function CheckInView({
  isCheckedIn,
  user,
  attendanceLogs,
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
            ? (attendanceLogs[attendanceLogs.length - 1]?.startImageUrl ?? PLACEHOLDER_IMAGE_URL)
            : '/imgs/time-clock/default.svg'
        }
        radius="50%"
      />
      <Stack gap={8} align="center">
        <LiveClock c={isCheckedIn ? 'var(--warning)' : 'var(--time-clock-primary)'} />
        <Address />
      </Stack>
      <Actions isCheckedIn={isCheckedIn} onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <AttendanceLogsInformation attendanceLogs={attendanceLogs} />
    </Stack>
  )
}
