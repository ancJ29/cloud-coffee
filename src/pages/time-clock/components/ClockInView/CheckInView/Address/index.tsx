import { useGeoLocation } from '@/hooks/useGeoLocation'
import { Text } from '@mantine/core'
import classes from './Address.module.scss'

export default function Address() {
  const { address, error, loading } = useGeoLocation()

  if (loading) {
    return (
      <Text c="dimmed" className={classes.text}>
        Đang lấy vị trí của bạn...
      </Text>
    )
  }

  if (error) {
    return (
      <Text c="red" className={classes.text}>
        {error}
      </Text>
    )
  }

  return <Text className={classes.text}>{address}</Text>
}
