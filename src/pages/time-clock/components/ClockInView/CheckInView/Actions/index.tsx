import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'
import classes from './Actions.module.scss'

type ActionsProps = {
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function Actions({ onCheckIn, onCheckOut }: ActionsProps) {
  const t = useTranslation()

  return (
    <Stack gap={12}>
      <Button
        color="var(--check-in-btn)"
        c="var(--check-in-text)"
        onClick={onCheckIn}
        className={classes.button}
      >
        {t('Check in')}
      </Button>
      <Button
        color="var(--check-out-btn)"
        c="var(--check-out-text)"
        onClick={onCheckOut}
        className={classes.button}
      >
        {t('Check out')}
      </Button>
    </Stack>
  )
}
