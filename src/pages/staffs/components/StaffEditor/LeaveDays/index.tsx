import useTranslation from '@/hooks/useTranslation'
import { Text } from '@mantine/core'

export default function LeaveDays() {
  const t = useTranslation()
  return <Text c="dimmed">{t('Sorry, this feature is implemented yet')}</Text>
}
