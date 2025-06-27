import { WEEKDAYS } from '@/configs/constant'
import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'
import Header from './Header'
import Item from './Item'

export default function WorkingHours() {
  const t = useTranslation()

  return (
    <Stack gap={0}>
      <Text fw="bold" fz={16}>
        {t('Working hours')}
      </Text>
      <Header />
      {WEEKDAYS.map((day, idx) => (
        <Item key={idx} label={day} startTime="08:00" endTime="17:00" showCopyIcon={idx === 0} />
      ))}
    </Stack>
  )
}
