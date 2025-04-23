import { Image } from '@mantine/core'
import classes from './Fireworks.module.scss'

export default function Fireworks() {
  return (
    <>
      <Image className={classes.topLeft} src="/imgs/check-in/star-four-yellow.svg" />
      <Image className={classes.topRight} src="/imgs/check-in/star-four-purple.svg" />
      <Image className={classes.bottomRight} src="/imgs/check-in/star-four-yellow.svg" />
    </>
  )
}
