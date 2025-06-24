import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'

export default function DeleteSuccessMessage() {
  const t = useTranslation()

  return (
    <Stack gap={0}>
      <Text>{t('Staff deleted successfully')}</Text>
      <Text>{t('Please close this window')}</Text>
    </Stack>
  )
}
