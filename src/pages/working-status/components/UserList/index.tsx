import { Avatar } from '@/components'
import { Indicator, Text } from '@mantine/core'
import { AttendanceStatus, UserAttendanceStatus } from '../../_configs'
import classes from './index.module.scss'

type UserListProps = {
  userAttendanceStatusList: UserAttendanceStatus[]
}

export default function UserList({ userAttendanceStatusList }: UserListProps) {
  return userAttendanceStatusList.map((user) => (
    <div key={user.id} className={classes.item}>
      <Indicator
        disabled={user.attendanceStatus === AttendanceStatus.NOT_WORKING}
        size={10}
        color={
          user.attendanceStatus === AttendanceStatus.WORKING
            ? 'var(--success)'
            : 'var(--check-out-indicator)'
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
