import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'

type WorkEntryViewProps = {
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function WorkEntryView({ onCheckIn, onCheckOut }: WorkEntryViewProps) {
  const t = useTranslation()

  return (
    <Stack gap={30} h="100dvh" align="center" justify="center">
      <Button
        color="var(--check-in-fg)"
        h={150}
        fz={{ base: 40, sm: 50 }}
        w={{ base: '95%', sm: '80%' }}
        onClick={onCheckIn}
      >
        {t('Check in')}
      </Button>
      <Button
        color="var(--check-out-fg)"
        h={150}
        fz={{ base: 40, sm: 50 }}
        w={{ base: '95%', sm: '80%' }}
        onClick={onCheckOut}
      >
        {t('Check out')}
      </Button>
    </Stack>
  )
}
