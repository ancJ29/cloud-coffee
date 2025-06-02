import { Button } from '@mantine/core'
import classes from './Actions.module.scss'

type ActionsProps = {
  isCheckedIn: boolean
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function Actions({ isCheckedIn, onCheckIn, onCheckOut }: ActionsProps) {
  return (
    <Button
      color={`${isCheckedIn ? 'var(--time-clock-secondary-color)' : 'var(--time-clock-primary-color)'}`}
      c="white"
      onClick={isCheckedIn ? onCheckOut : onCheckIn}
      className={classes.button}
      w="80dvw"
    >
      {isCheckedIn ? 'CLOCK OUT' : 'CLOCK IN'}
    </Button>
  )
}
