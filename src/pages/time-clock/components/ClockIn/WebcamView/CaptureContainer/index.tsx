import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'
import classes from './CaptureContainer.module.scss'

type CaptureContainerProps = {
  isCapturing: boolean
  onCapture: () => void
  onReturn: () => void
  onSubmit: () => void
}

export default function CaptureContainer({
  isCapturing,
  onCapture,
  onReturn,
  onSubmit,
}: CaptureContainerProps) {
  const t = useTranslation()

  return (
    <Stack align="center" justify="center" pos="relative" w="100%" mt={30}>
      {isCapturing ? (
        <Button
          color="var(--time-clock-primary-color)"
          className={classes.confirmButton}
          onClick={onSubmit}
        >
          OK
        </Button>
      ) : (
        <>
          <Button variant="default" className={classes.captureButton} onClick={onCapture} />
          <Button variant="subtle" color="gray" pos="absolute" left={0} onClick={onReturn}>
            {t('Cancel')}
          </Button>
        </>
      )}
    </Stack>
  )
}
