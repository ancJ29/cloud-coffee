import { EmptyBox } from '@/components'
import useUserStore from '@/stores/user.store'
import { Stack } from '@mantine/core'
import { useSyncExternalStore } from 'react'
import store from '../../../_attendance.store'
import Header from './Header'
import Item from './Item'

export default function Desktop() {
  const { users } = useUserStore()
  const { updates } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Stack gap={0} visibleFrom="sm">
      <Header />
      {Object.keys(updates).map((userId) => (
        <Item key={userId} user={users.get(userId)} attendanceLogs={updates[userId]} />
      ))}
      {Object.keys(updates).length === 0 && <EmptyBox />}
    </Stack>
  )
}
