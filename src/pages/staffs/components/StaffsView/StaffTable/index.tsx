import { User } from '@/services/domain'
import { Stack } from '@mantine/core'
import Header from './Header'
import Item from './Item'

type StaffTableProps = {
  users: User[]
  onEditStaff: (user: User) => void
  onDeleteStaff: (user: User) => void
}

export default function StaffTable({ users, onEditStaff, onDeleteStaff }: StaffTableProps) {
  return (
    <Stack gap={0}>
      <Header />
      {users.map((user) => (
        <Item key={user.id} user={user} onEdit={onEditStaff} onDelete={onDeleteStaff} />
      ))}
    </Stack>
  )
}
