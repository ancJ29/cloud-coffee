import { Avatar } from '@/components'
import { User } from '@/services/domain'
import { stopMouseEvent } from '@/utils'
import { Image, Text } from '@mantine/core'
import { useCallback } from 'react'
import classes from './index.module.scss'

type ItemProps = {
  user: User
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export default function Item({ user, onEdit, onDelete }: ItemProps) {
  const handleEdit = useCallback(() => {
    onEdit(user)
  }, [onEdit, user])

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      stopMouseEvent(e)
      onDelete(user)
    },
    [onDelete, user],
  )

  return (
    <div className={classes.container} onClick={handleEdit}>
      <div className={classes.info}>
        <Avatar src={user.avatar} size={40} />
        <Text fz={16}>{user.name}</Text>
      </div>
      <div className={classes.action}>
        <Image src="/imgs/staff/edit.svg" width={20} height={20} className={classes.icon} />
        <Image
          src="/imgs/staff/delete.svg"
          width={20}
          height={20}
          className={classes.icon}
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}
