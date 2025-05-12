import useTranslation from '@/hooks/useTranslation'
import { Shift } from '@/services/domain'
import { formatTime } from '@/utils'
import { Stack, Text } from '@mantine/core'

type ShiftInformationProps = {
  shifts: Shift[]
}

export default function ShiftInformation({ shifts }: ShiftInformationProps) {
  const t = useTranslation()

  if (shifts.length === 0) {
    return (
      <Text ta="center" fw={500}>
        {t('You have not checked in today')}
      </Text>
    )
  }

  return (
    <Stack gap={10}>
      {shifts.map((shift, idx) => (
        <Text ta="center" fw={500} key={idx}>
          {`${t('Check in at')} ${formatTime(shift.start, 'HH:mm A')} ${shift?.end ? `- ${t('Check out at')} ${formatTime(shift.end, 'HH:mm A')}` : ''}`}
        </Text>
      ))}
    </Stack>
  )
}
