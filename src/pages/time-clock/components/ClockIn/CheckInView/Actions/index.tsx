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
      color={`${isCheckedOut ? 'var(--time-clock-primary-color)' : 'var(--time-clock-secondary-color)'}`}
      c="white"
      onClick={isCheckedOut ? onCheckIn : onCheckOut}
      className={classes.button}
      w="80dvw"
    >
      {isCheckedOut ? 'CLOCK IN' : 'CLOCK OUT'}
    </Button>
  )
}
