import { useGeoLocation } from '@/hooks/useGeoLocation'
import useTranslation from '@/hooks/useTranslation'
import { Flex, Text } from '@mantine/core'
import { IconUserPin } from '@tabler/icons-react'
import classes from './Address.module.scss'

export default function Address() {
  const t = useTranslation()
  const { address, loading } = useGeoLocation()

  return (
    <Flex gap={10} className={classes.container}>
      <IconUserPin stroke={1.5} size={20} />
      <Text className={classes.text} c={loading ? 'dimmed' : 'black'}>
        {loading ? t('Taking your position') : address}
      </Text>
    </Flex>
  )
}
