import LiveClock from '@/components/c-time-keeper/LiveClock'
import { dataUrlToFile, formatTime } from '@/utils'
import { Stack } from '@mantine/core'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Address from '../CheckInView/Address'
import CaptureContainer from './CaptureContainer'
import Header from './Header'
import classes from './WebcamView.module.scss'

type WebcamViewProps = {
  onSubmit: (file: File) => void
  onReturn: () => void
}

export default function WebcamView({ onSubmit, onReturn }: WebcamViewProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setImageSrc(imageSrc)
        setIsCapturing(true)
      }
    }
  }, [])

  const submit = useCallback(() => {
    if (!imageSrc) {
      return
    }
    const file = dataUrlToFile(imageSrc, `${formatTime(Date.now(), 'YYYY-MM-DD-HH-mm-ss')}.jpg`)
    onSubmit(file)
  }, [imageSrc, onSubmit])

  const reCapture = useCallback(() => {
    setImageSrc(null)
    setIsCapturing(false)
  }, [])

  return (
    <Stack h="100%" align="center" gap={0}>
      <Header
        isCapturing={isCapturing}
        onFlash={() => {}}
        onRotateCamera={() => {}}
        onReCapture={reCapture}
      />
      <Webcam
        ref={webcamRef}
        mirrored
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{ facingMode: 'user' }}
        className={classes.webcam}
      />
      <Stack align="center" px={20} gap={0} mt={10}>
        <LiveClock c="var(--time-clock-primary-color)" />
        <Address />
      </Stack>
      <CaptureContainer
        isCapturing={isCapturing}
        onCapture={capture}
        onReturn={onReturn}
        onSubmit={submit}
      />
    </Stack>
  )
}
