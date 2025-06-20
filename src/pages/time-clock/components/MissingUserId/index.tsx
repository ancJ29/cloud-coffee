import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'

export default function MissingUserId() {
  const t = useTranslation()

  return (
    <Stack align="center" justify="center" gap={10} h="100dvh" px={10}>
      <Text ta="center" fw="bold" fz={20}>
        {t('The staff ID is missing')}
      </Text>
      <Text ta="center">
        {t('Please check the URL or contact support if you believe this is a mistake')}
      </Text>
    </Stack>
  )
}
