import LiveClock from '@/components/c-time-keeper/LiveClock'
import Avatar from '@/components/common/Avatar'
import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { Stack, Text } from '@mantine/core'

type TitleProps = {
  user?: User
}

export default function Title({ user }: TitleProps) {
  const t = useTranslation()
  const names = (user?.name || '').split(' ')
  const name = names[names?.length - 1]

  return (
    <Stack gap={15} mt={40} align="center">
      <Avatar src={user?.avatar} size={90} />
      <Stack gap={0} align="center">
        <Text fw={500}>{`${name}, ${t('please select a function')}`}</Text>
        <LiveClock />
      </Stack>
    </Stack>
  )
}
