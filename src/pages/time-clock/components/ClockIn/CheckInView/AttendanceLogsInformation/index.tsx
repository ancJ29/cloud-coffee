import useTranslation from '@/hooks/useTranslation'
import { AttendanceLog } from '@/services/domain'
import { formatTime } from '@/utils'
import { Stack, Text } from '@mantine/core'

type AttendanceLogsInformationProps = {
  attendanceLogs: AttendanceLog[]
}

export default function AttendanceLogsInformation({
  attendanceLogs,
}: AttendanceLogsInformationProps) {
  const t = useTranslation()

  return (
    <Stack gap={6}>
      {attendanceLogs.map((attendanceLog, idx) => (
        <Text fw={500} key={idx}>
          {t('Checked in at')} <strong>{formatTime(attendanceLog.start, 'HH:mm A')}</strong>
          {attendanceLog?.end && ` - ${t('Checked out at')} `}
          <strong>{attendanceLog?.end && formatTime(attendanceLog.end, 'HH:mm A')}</strong>
        </Text>
      ))}
    </Stack>
  )
}
