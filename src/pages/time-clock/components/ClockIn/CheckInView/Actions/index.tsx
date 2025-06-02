import { Button } from '@mantine/core'
import classes from './Actions.module.scss'

type ActionsProps = {
  isCheckedOut: boolean
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function Actions({ isCheckedOut, onCheckIn, onCheckOut }: ActionsProps) {
  return (
    <Button
      color={`${isCheckedOut ? 'var(--time-clock-secondary-color)' : 'var(--time-clock-primary-color)'}`}
      c="white"
      onClick={isCheckedOut ? onCheckOut : onCheckIn}
      className={classes.button}
      w="80dvw"
    >
      {isCheckedOut ? 'CLOCK OUT' : 'CLOCK IN'}
    </Button>
  )
}
