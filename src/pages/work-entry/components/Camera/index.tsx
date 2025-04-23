import Webcam from 'react-webcam'
import IconCorner from '../IconCorner'
import classes from './Camera.module.scss'

type CameraProps = {
  webcamRef: React.MutableRefObject<Webcam | null>
  isCapturing: boolean
  countdown: number
}

export default function Camera({ webcamRef, isCapturing, countdown }: CameraProps) {
  return (
    <>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" mirrored className={classes.webcam} />
      <IconCorner position="top-left" top="0" left="0" />
      <IconCorner position="top-right" top="0" right="0" />
      <IconCorner position="bottom-left" bottom="0" left="0" />
      <IconCorner position="bottom-right" bottom="0" right="0" />
      {isCapturing && (
        <div className={classes.loadingContainer}>
          <div className={classes.spinner} />
          <div className={classes.countdown}>{countdown}</div>
        </div>
      )}
    </>
  )
}
