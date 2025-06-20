import { User } from '@/services/domain'
import { Stack } from '@mantine/core'
import Header from './Header'
import Item from './Item'

type StaffTableProps = {
  users: User[]
  onEditStaff: (user: User) => void
}

export default function StaffTable({ users, onEditStaff }: StaffTableProps) {
  return (
    <Stack gap={0}>
      <Header />
      {users.map((user) => (
        <Item key={user.id} user={user} onClick={() => onEditStaff(user)} />
      ))}
    </Stack>
  )
}
