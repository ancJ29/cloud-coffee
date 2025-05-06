import LiveClock from '@/components/c-time-keeper/LiveClock'
import { User } from '@/services/domain'
import { formatTime } from '@/utils'
import { Stack, Text } from '@mantine/core'
import classes from './UserInformation.module.scss'

type UserInformationProps = {
  user?: User
}

export default function UserInformation({ user }: UserInformationProps) {
  const now = Date.now()

  return (
    <Stack gap={0}>
      <Text className={`${classes.text} ${classes.name}`}>{user?.name}</Text>
      <LiveClock className={`${classes.text} ${classes.clock}`} />
      <Text className={`${classes.text} ${classes.time}`}>{formatTime(now, 'ddd DD/MM/YYYY')}</Text>
    </Stack>
  )
}
