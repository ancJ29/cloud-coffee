import { User } from '@/services/domain'
import { Avatar, Card, Grid, Text } from '@mantine/core'
import classes from './WorkEntryForm.module.scss'

type WorkEntryFormProps = {
  users: Record<string, User>
  onClick: (userId: string) => void
}

export default function WorkEntryForm({ users, onClick }: WorkEntryFormProps) {
  return (
    <Grid gutter="sm">
      {Object.values(users).map((user) => (
        <Grid.Col key={user.id} span={{ base: 12, sm: 6, lg: 4 }} className={classes.item}>
          <Card shadow="md" withBorder className={classes.card} onClick={() => onClick(user.id)}>
            <Avatar size={70} src={user.avatar} />
            <Text fz={{ base: 36, sm: 50 }} fw={400}>
              {user.name}
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  )
}
