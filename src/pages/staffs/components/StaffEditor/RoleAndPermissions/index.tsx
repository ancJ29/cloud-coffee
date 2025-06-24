import useTranslation from '@/hooks/useTranslation'
import { Text } from '@mantine/core'

export default function RoleAndPermissions() {
  const t = useTranslation()
  return <Text c="dimmed">{t('Sorry, this feature is implemented yet')}</Text>
}
