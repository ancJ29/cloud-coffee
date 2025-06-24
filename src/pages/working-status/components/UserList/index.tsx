import { Avatar } from '@/components'
import { Indicator, Text } from '@mantine/core'
import { ShiftStatus, UserShiftStatus } from '../../_configs'
import classes from './index.module.scss'

type UserListProps = {
  userShiftStatusList: UserShiftStatus[]
}

export default function UserList({ userShiftStatusList }: UserListProps) {
  return userShiftStatusList.map((user) => (
    <div key={user.id} className={classes.item}>
      <Indicator
        disabled={user.shiftStatus === ShiftStatus.NOT_WORKING}
        size={10}
        color={
          user.shiftStatus === ShiftStatus.WORKING ? 'var(--success)' : 'var(--check-out-indicator)'
        }
        offset={4}
        position="top-start"
      >
        <Avatar src={user.avatar} />
      </Indicator>

      <Text fz={18} fw={500}>
        {user.name}
      </Text>
    </div>
  ))
}
