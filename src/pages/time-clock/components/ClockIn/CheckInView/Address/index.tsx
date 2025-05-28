import { useGeoLocation } from '@/hooks/useGeoLocation'
import useTranslation from '@/hooks/useTranslation'
import { Flex, Text } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'

export default function Address() {
  const t = useTranslation()
  const { address, loading } = useGeoLocation()

  return (
    <Flex gap={10} align="center">
      <IconMapPin stroke={1.5} size={40} />
      <Text fw="bold" c={loading ? 'dimmed' : 'black'}>
        {loading ? t('Taking your position') : address}
      </Text>
    </Flex>
  )
}
