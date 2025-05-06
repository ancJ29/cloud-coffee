import Camera from '@/components/c-time-keeper/Camera'
import IconUserWithCorner from '@/components/c-time-keeper/IconUserWithCorner'
import ManageButton from '@/components/c-time-keeper/ManageButton'
import Picture from '@/components/c-time-keeper/Picture'
import useCameraPermission from '@/hooks/useCameraPermission'
import { User } from '@/services/domain'
import { ONE_SECOND } from '@/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Fireworks from '../Fireworks'
import UserInformation from '../UserInformation'
import classes from './CheckInView.module.scss'

const COUNTDOWN_TIME = 3
const CAPTURE_DELAY = (COUNTDOWN_TIME + 0.3) * ONE_SECOND

type CheckInViewProps = {
  user: User
  venueId: string
  onSubmit: () => void
}

export default function CheckInView({ user, venueId, onSubmit }: CheckInViewProps) {
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
        setImageSrc(imageSrc)
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

  return (
    <div className={classes.container}>
      {hasPermission ? (
        <div className={classes.webcamContainer}>
          {imageSrc ? (
            <Picture imageSrc={imageSrc} onConfirm={onSubmit} onRetry={handleRetry} />
          ) : (
            <Camera webcamRef={webcamRef} isCapturing={isCapturing} countdown={countdown} />
          )}
        </div>
      ) : (
        <IconUserWithCorner />
      )}
      <UserInformation user={user} venueId={venueId} />
      <Fireworks />
      <ManageButton />
    </div>
  )
}
