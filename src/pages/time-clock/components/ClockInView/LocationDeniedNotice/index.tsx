import useTranslation from '@/hooks/useTranslation'
import { Button, Stack, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export default function LocationDeniedNotice() {
  const navigate = useNavigate()
  const t = useTranslation()

  return (
    <Stack gap={20} align="center" justify="center" h="100%">
      <Text ta="center" fz={24}>
        {t('You have not granted location access to the browser on your device')}
      </Text>
      <Button onClick={() => navigate('/location-permission-guide')}>
        {t('See permission instructions')}
      </Button>
    </Stack>
  )
}
