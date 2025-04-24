import LiveClock from '@/components/c-time-keeper/LiveClock'
import { User } from '@/services/domain'
import { formatTime } from '@/utils'
import { Text } from '@mantine/core'
import classes from './Title.module.scss'

type TitleProps = {
  user: User
}

export default function Title({ user }: TitleProps) {
  const now = Date.now()

  return (
    <>
      <Text className={`${classes.text} ${classes.name}`}>{user.name}</Text>
      <Text className={`${classes.text} ${classes.time}`}>{formatTime(now, 'ddd DD/MM/YYYY')}</Text>
      <LiveClock className={`${classes.text} ${classes.clock}`} />
    </>
  )
}
