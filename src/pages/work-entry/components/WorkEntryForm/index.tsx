import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { ActionIcon, Avatar, Card, Flex, Grid, Stack, Text } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import classes from './WorkEntryForm.module.scss'

type WorkEntryFormProps = {
  isCheckIn: boolean
  users: Record<string, User>
  onClick: (userId: string) => void
  onReturn: () => void
}

export default function WorkEntryForm({ isCheckIn, users, onClick, onReturn }: WorkEntryFormProps) {
  const t = useTranslation()

  return (
    <Stack className={classes.container}>
      <Flex justify="space-between" align="center">
        <Text className={classes.title}>{t(isCheckIn ? 'Check in' : 'Check out')}</Text>
        <ActionIcon variant="outline" color="white" mr={8} onClick={onReturn}>
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Flex>
      <Grid gutter="sm">
        {Object.values(users).map((user) => (
          <Grid.Col key={user.id} span={{ base: 12, sm: 6, lg: 4 }} className={classes.item}>
            <Card shadow="md" className={classes.card} onClick={() => onClick(user.id)}>
              <Avatar size={70} src={user.avatar} />
              <Text fz={{ base: 36, sm: 50 }} fw={400}>
                {user.name}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  )
}
