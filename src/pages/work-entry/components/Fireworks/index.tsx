import { Image } from '@mantine/core'
import classes from './Fireworks.module.scss'

export default function Fireworks() {
  return (
    <>
      <Image className={classes.topLeft} src="/imgs/work-entry/star-four-yellow.svg" />
      <Image className={classes.topRight} src="/imgs/work-entry/star-four-purple.svg" />
      <Image className={classes.bottomLeft} src="/imgs/work-entry/shining-star-purple.svg" />
      <Image className={classes.bottomRight} src="/imgs/work-entry/shining-star-yellow.svg" />
    </>
  )
}
