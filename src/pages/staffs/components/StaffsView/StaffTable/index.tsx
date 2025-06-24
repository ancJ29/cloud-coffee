import { User } from '@/services/domain'
import { Stack } from '@mantine/core'
import Header from './Header'
import Item from './Item'
import UserSearchEmpty from './UserSearchEmpty'

type StaffTableProps = {
  users: User[]
  keyword: string
  onEditStaff: (user: User) => void
  onDeleteStaff: (user: User) => void
}

export default function StaffTable({
  users,
  keyword,
  onEditStaff,
  onDeleteStaff,
}: StaffTableProps) {
  return (
    <Stack gap={0}>
      <Header />
      {users.map((user) => (
        <Item key={user.id} user={user} onEdit={onEditStaff} onDelete={onDeleteStaff} />
      ))}
      {users.length === 0 && <UserSearchEmpty keyword={keyword} />}
    </Stack>
  )
}
