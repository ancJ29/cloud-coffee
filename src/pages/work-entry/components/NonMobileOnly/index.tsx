import useTranslation from '@/hooks/useTranslation'
import { Center, Text } from '@mantine/core'

export default function NonMobileOnly() {
  const t = useTranslation()

  return (
    <Center w="100vw" h="100vh" px={10}>
      <Text ta="center" fz={20} fw={500} c="white">
        {t('Please use tablet or laptop device to view this page')}
      </Text>
    </Center>
  )
}
