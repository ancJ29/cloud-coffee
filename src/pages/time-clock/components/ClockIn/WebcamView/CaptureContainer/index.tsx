import useTranslation from '@/hooks/useTranslation'
import { Button, Image, Stack } from '@mantine/core'
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
    <Stack className={classes.container}>
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
          <Image src="/imgs/time-clock/button.svg" w={60} h={60} onClick={onCapture} />
          <Button variant="subtle" color="gray" pos="absolute" left={0} onClick={onReturn}>
            {t('Cancel')}
          </Button>
        </>
      )}
    </Stack>
  )
}
