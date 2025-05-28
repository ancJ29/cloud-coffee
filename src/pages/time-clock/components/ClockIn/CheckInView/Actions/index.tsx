import useTranslation from '@/hooks/useTranslation'
import { Shift } from '@/services/domain'
import { Button } from '@mantine/core'
import classes from './Actions.module.scss'

type ActionsProps = {
  shifts: Shift[]
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function Actions({ shifts, onCheckIn, onCheckOut }: ActionsProps) {
  const t = useTranslation()
  const isCheckedIn = shifts.length > 0 ? !(shifts[shifts.length - 1]?.end !== null) : false

  return (
    <Button
      color="var(--time-clock-primary-color)"
      c="white"
      fullWidth
      onClick={isCheckedIn ? onCheckOut : onCheckIn}
      className={classes.button}
    >
      {isCheckedIn ? t('Check out') : t('Check in')}
    </Button>
  )
}
