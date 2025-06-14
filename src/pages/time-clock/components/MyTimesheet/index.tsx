import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'

export default function MyTimesheet() {
  const t = useTranslation()

  return (
    <Stack px={20} align="center" justify="center" h="100%">
      <Text c="var(--time-clock-accent)">{t('Sorry, this feature is implemented yet')}</Text>
    </Stack>
  )
}
