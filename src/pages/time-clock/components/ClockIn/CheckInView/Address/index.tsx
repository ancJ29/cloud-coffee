import { useGeoLocation } from '@/hooks/useGeoLocation'
import useTranslation from '@/hooks/useTranslation'
import { Flex, Image, Text } from '@mantine/core'

export default function Address() {
  const t = useTranslation()
  const { address, loading } = useGeoLocation()

  return (
    <Flex gap={10} align="center" w="100%">
      <Image src="/imgs/time-clock/map-pin.svg" width={30} height={30} />
      <Text fw="bold" c={loading ? 'dimmed' : 'black'}>
        {loading ? t('Taking your position') : address}
      </Text>
    </Flex>
  )
}
