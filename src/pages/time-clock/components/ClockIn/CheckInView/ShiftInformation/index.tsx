import useTranslation from '@/hooks/useTranslation'
import { Shift } from '@/services/domain'
import { formatTime } from '@/utils'
import { Stack, Text } from '@mantine/core'

type ShiftInformationProps = {
  shifts: Shift[]
}

export default function ShiftInformation({ shifts }: ShiftInformationProps) {
  const t = useTranslation()

  return (
    <Stack gap={6}>
      {shifts.map((shift, idx) => (
        <Text fw={500} key={idx}>
          {t('Checked in at')}{' '}
          <Text fw="bold" span>
            {formatTime(shift.start, 'HH:mm A')}
          </Text>
          {shift?.end && ` - ${t('Checked out at')} `}
          <Text fw="bold" span>
            {shift?.end && formatTime(shift.end, 'HH:mm A')}
          </Text>
        </Text>
      ))}
    </Stack>
  )
}
