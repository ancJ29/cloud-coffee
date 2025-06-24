import { Avatar } from '@/components'
import useAuthStore from '@/stores/auth.store'
import { Stack, Text } from '@mantine/core'
import { IconChevronUp } from '@tabler/icons-react'
import classes from './index.module.scss'

type UserInformationProps = {
  menuOpened: boolean
}

export default function UserInformation({ menuOpened }: UserInformationProps) {
  const { user } = useAuthStore()

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.content}>
          <Avatar size={30} src={user?.avatar} />
          <Stack gap={0}>
            <Text fz={12} fw={400}>
              {user?.name || ''}
            </Text>
            <Text c="dimmed" fz={8}>
              {user?.email || ''}
            </Text>
          </Stack>
        </div>
        <IconChevronUp
          size={16}
          stroke={2}
          style={{
            transform: menuOpened ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms ease',
            marginTop: '1px',
          }}
        />
      </div>
    </div>
  )
}
