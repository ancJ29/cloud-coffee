import Avatar from '@/components/common/Avatar'
import { User } from '@/services/domain'
import { Image, Text } from '@mantine/core'
import classes from './Item.module.scss'

type ItemProps = {
  user: User
  onClick: () => void
}

export default function Item({ user, onClick }: ItemProps) {
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <Avatar src={user.avatar} size={40} />
        <Text fz={16}>{user.name}</Text>
      </div>
      <div className={classes.action}>
        <Image src="/imgs/staff/edit.svg" width={20} height={20} onClick={onClick} />
        <Image src="/imgs/staff/delete.svg" width={20} height={20} onClick={() => {}} />
      </div>
    </div>
  )
}
