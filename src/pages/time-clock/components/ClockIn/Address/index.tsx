import { useGeoLocation } from '@/hooks/useGeoLocation'
import useTranslation from '@/hooks/useTranslation'
import { Flex, Image, Text } from '@mantine/core'

export default function Address() {
  const t = useTranslation()
  const { address, loading } = useGeoLocation()

  return (
    <Flex gap={5} align="center" w="100%">
      <Image src="/imgs/time-clock/map-pin.svg" w={26} />
      <Text fw="bold" c={loading ? 'dimmed' : 'var(--mantine-color-text)'}>
        {loading ? t('Taking your position') : address}
      </Text>
    </Flex>
  )
}
