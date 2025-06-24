import { Avatar } from '@/components'
import { User } from '@/services/domain'
import { Image, Text } from '@mantine/core'
import classes from './index.module.scss'

type ItemProps = {
  user: User
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export default function Item({ user, onEdit, onDelete }: ItemProps) {
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <Avatar src={user.avatar} size={40} />
        <Text fz={16}>{user.name}</Text>
      </div>
      <div className={classes.action}>
        <Image
          src="/imgs/staff/edit.svg"
          width={20}
          height={20}
          className={classes.icon}
          onClick={() => onEdit(user)}
        />
        <Image
          src="/imgs/staff/delete.svg"
          width={20}
          height={20}
          className={classes.icon}
          onClick={() => onDelete(user)}
        />
      </div>
    </div>
  )
}
