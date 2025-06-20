import useTranslation from '@/hooks/useTranslation'
import { Text } from '@mantine/core'

export default function StaffInformation() {
  const t = useTranslation()
  return <Text c="var(--time-clock-accent)">{t('Sorry, this feature is implemented yet')}</Text>
}
