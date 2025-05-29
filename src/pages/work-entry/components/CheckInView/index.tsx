import ActionButtons from '@/components/c-time-keeper/ActionButtons'
import Camera from '@/components/c-time-keeper/Camera'
import IconUserWithCorner from '@/components/c-time-keeper/IconUserWithCorner'
import ManageButton from '@/components/c-time-keeper/ManageButton'
import Picture from '@/components/c-time-keeper/Picture'
import useCameraPermission from '@/hooks/useCameraPermission'
import { User, Venue } from '@/services/domain'
import { dataUrlToFile, formatTime, ONE_SECOND } from '@/utils'
import { Stack, Text } from '@mantine/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import classes from './CheckInView.module.scss'
import Fireworks from './Fireworks'
import UserInformation from './UserInformation'

const COUNTDOWN_TIME = 3
const CAPTURE_DELAY = (COUNTDOWN_TIME + 0.3) * ONE_SECOND

type CheckInViewProps = {
  venue?: Venue
  user: User
  onSubmit: (file: File) => void
}

export default function CheckInView({ venue, user, onSubmit }: CheckInViewProps) {
  const hasPermission = useCameraPermission()
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const webcamRef = useRef<Webcam | null>(null)
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME)
  const [isCapturing, setIsCapturing] = useState(true)

  useEffect(() => {
    if (imageSrc) {
      return
    }

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval)
          setIsCapturing(false)
        }
        return prev - 1
      })
    }, ONE_SECOND)

    const timer = setTimeout(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot()
        if (imageSrc) {
          setImageSrc(imageSrc)
        }
      }
    }, CAPTURE_DELAY)

    return () => {
      clearInterval(countdownInterval)
      clearTimeout(timer)
    }
  }, [imageSrc])

  const handleRetry = useCallback(() => {
    setImageSrc(null)
    setCountdown(COUNTDOWN_TIME)
    setIsCapturing(true)
  }, [])

  const handleSubmit = useCallback(() => {
    if (!imageSrc) {
      return
    }
    const file = dataUrlToFile(imageSrc, `${formatTime(Date.now(), 'YYYY-MM-DD-HH-mm-ss')}.jpg`)
    onSubmit(file)
  }, [imageSrc, onSubmit])

  return (
    <Stack gap={20} align="center" justify="center" h="100dvh">
      {hasPermission ? (
        <Stack gap={10}>
          {imageSrc ? (
            <Picture imageSrc={imageSrc} />
          ) : (
            <Camera webcamRef={webcamRef} isCapturing={isCapturing} countdown={countdown} />
          )}
          <ActionButtons
            isVisible={imageSrc !== null}
            onRetry={handleRetry}
            onSubmit={handleSubmit}
          />
        </Stack>
      ) : (
        <IconUserWithCorner />
      )}
      <Text className={classes.venue}>{venue?.name}</Text>
      <UserInformation user={user} />
      <Fireworks />
      <ManageButton />
    </Stack>
  )
}
