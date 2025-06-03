import LiveClock from '@/components/c-time-keeper/LiveClock'
import { formatTime } from '@/utils'
import { Stack, Text } from '@mantine/core'
import classes from './Information.module.scss'

export default function Information() {
  const now = Date.now()
  return (
    <Stack className={classes.container}>
      <LiveClock className={`${classes.text} ${classes.clock}`} fz={36} />
      <Text className={`${classes.text} ${classes.time}`}>{formatTime(now, 'ddd DD/MM/YYYY')}</Text>
    </Stack>
  )
}
