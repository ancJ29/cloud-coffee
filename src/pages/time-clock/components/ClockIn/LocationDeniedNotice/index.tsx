import useTranslation from '@/hooks/useTranslation'
import { Button, Stack, Text } from '@mantine/core'

export default function LocationDeniedNotice() {
  const t = useTranslation()

  return (
    <Stack gap={20} align="center" justify="center" h="100%">
      <Text ta="center" fz={24}>
        {t('You have not granted location access to the browser on your device')}
      </Text>
      <Button onClick={() => window.open('/location-permission-guide', '_blank')}>
        {t('See permission instructions')}
      </Button>
    </Stack>
  )
}
