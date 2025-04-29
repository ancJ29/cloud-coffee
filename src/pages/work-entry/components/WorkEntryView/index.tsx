import ManageButton from '@/components/c-time-keeper/ManageButton'
import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'
import classes from './WorkEntryView.module.scss'

type WorkEntryViewProps = {
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function WorkEntryView({ onCheckIn, onCheckOut }: WorkEntryViewProps) {
  const t = useTranslation()

  return (
    <Stack className={classes.container}>
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

      <ManageButton />
    </Stack>
  )
}
