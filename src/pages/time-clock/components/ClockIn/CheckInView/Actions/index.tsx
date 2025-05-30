import useTranslation from '@/hooks/useTranslation'
import { Button } from '@mantine/core'
import classes from './Actions.module.scss'

type ActionsProps = {
  isCheckedIn: boolean
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function Actions({ isCheckedIn, onCheckIn, onCheckOut }: ActionsProps) {
  const t = useTranslation()

  return (
    <Button
      color={`${isCheckedIn ? 'var(--time-clock-secondary-color)' : 'var(--time-clock-primary-color)'}`}
      c="white"
      fullWidth
      onClick={isCheckedIn ? onCheckOut : onCheckIn}
      className={classes.button}
    >
      {isCheckedIn ? t('Check out') : t('Check in')}
    </Button>
  )
}
