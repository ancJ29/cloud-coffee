import { User } from '@/services/domain'
import { formatTime } from '@/utils'
import { Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import classes from './Title.module.scss'

type TitleProps = {
  user: User
}

export default function Title({ user }: TitleProps) {
  const now = Date.now()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Text className={`${classes.text} ${classes.name}`}>{user.name}</Text>
      <Text className={`${classes.text} ${classes.time}`}>{formatTime(now, 'ddd DD/MM/YYYY')}</Text>
      <Text className={`${classes.text} ${classes.clock}`}>
        {formatTime(currentTime.getTime(), 'hh:mm:ss A')}
      </Text>
    </>
  )
}
