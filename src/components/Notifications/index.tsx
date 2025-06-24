import { Notifications as MantineNotifications } from '@mantine/notifications'
import classes from './index.module.scss'

export function Notifications() {
  return <MantineNotifications position="top-center" zIndex={9999} classNames={classes} />
}
