import LiveClock from '@/components/c-time-keeper/LiveClock'
import { dataUrlToFile, formatTime } from '@/utils'
import { Image, Stack } from '@mantine/core'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Address from '../CheckInView/Address'
import CaptureContainer from './CaptureContainer'
import Header from './Header'
import classes from './WebcamView.module.scss'

type WebcamViewProps = {
  isCheckedIn: boolean
  onSubmit: (file: File) => void
  onReturn: () => void
}

export default function WebcamView({ isCheckedIn, onSubmit, onReturn }: WebcamViewProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<MediaTrackConstraints['facingMode']>('user')

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

  const rotateCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }, [])

  return (
    <Stack className={classes.container}>
      <Header
        isCapturing={isCapturing}
        onFlash={() => {}}
        onRotateCamera={rotateCamera}
        onReCapture={reCapture}
      />
      {imageSrc ? (
        <Image src={imageSrc} className={classes.image} />
      ) : (
        <Webcam
          ref={webcamRef}
          mirrored={facingMode === 'user'}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={{ facingMode }}
          className={classes.webcam}
        />
      )}
      <Stack align="center" px={20} gap={8} mt={10} h={100}>
        <LiveClock c={isCheckedIn ? 'var(--time-clock-live-clock)' : 'var(--time-clock-primary)'} />
        <Address />
      </Stack>
      <CaptureContainer
        isCheckedIn={isCheckedIn}
        isCapturing={isCapturing}
        onCapture={capture}
        onReturn={onReturn}
        onSubmit={submit}
      />
    </Stack>
  )
}
