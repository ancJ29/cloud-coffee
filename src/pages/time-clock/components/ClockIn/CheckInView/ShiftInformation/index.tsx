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
          {t('Checked in at')} <strong>{formatTime(shift.start, 'HH:mm A')}</strong>
          {shift?.end && ` - ${t('Checked out at')} `}
          <strong>{shift?.end && formatTime(shift.end, 'HH:mm A')}</strong>
        </Text>
      ))}
    </Stack>
  )
}
