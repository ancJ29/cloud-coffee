import useTranslation from '@/hooks/useTranslation'
import { Button, Image, Stack } from '@mantine/core'
import classes from './index.module.scss'

type CaptureContainerProps = {
  isCheckedIn: boolean
  isCapturing: boolean
  onCapture: () => void
  onReturn: () => void
  onSubmit: () => void
}

export default function CaptureContainer({
  isCheckedIn,
  isCapturing,
  onCapture,
  onReturn,
  onSubmit,
}: CaptureContainerProps) {
  const t = useTranslation()

  return (
    <Stack className={classes.container}>
      {isCapturing ? (
        <Button
          color={isCheckedIn ? 'var(--time-clock-secondary)' : 'var(--time-clock-primary)'}
          className={classes.confirmButton}
          onClick={onSubmit}
        >
          OK
        </Button>
      ) : (
        <>
          <Image src="/imgs/time-clock/button.svg" w={60} h={60} onClick={onCapture} />
          <Button variant="subtle" color="gray" pos="absolute" left={0} onClick={onReturn}>
            {t('Cancel')}
          </Button>
        </>
      )}
    </Stack>
  )
}
