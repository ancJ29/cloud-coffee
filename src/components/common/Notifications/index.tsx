import { Notifications as MantineNotifications } from '@mantine/notifications'
import classes from './Notifications.module.scss'

export default function Notifications() {
  return (
    <MantineNotifications
      position="top-center"
      zIndex={9999}
      classNames={classes}
      // styles={{
      //   root: {
      //     top: 0,
      //     pointerEvents: 'none',
      //   },
      // }}
    />
  )
}
