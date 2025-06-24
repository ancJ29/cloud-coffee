import useTranslation from '@/hooks/useTranslation'
import { Center, Text } from '@mantine/core'

export default function MobileOnlyWarning() {
  const t = useTranslation()

  return (
    <Center w="100vw" h="100vh">
      <Text ta="center">{t('Please use mobile device to view this page')}</Text>
    </Center>
  )
}
