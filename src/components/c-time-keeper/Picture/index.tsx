import { Image } from '@mantine/core'
import IconCorner from '../IconCorner'
import classes from './Picture.module.scss'

type PictureProps = {
  imageSrc: string
}

export default function Picture({ imageSrc }: PictureProps) {
  return (
    <div className={classes.container}>
      <Image src={imageSrc} className={classes.image} />
      <IconCorner position="top-left" top="0" left="0" />
      <IconCorner position="top-right" top="0" right="0" />
      <IconCorner position="bottom-left" bottom="0" left="0" />
      <IconCorner position="bottom-right" bottom="0" right="0" />
    </div>
  )
}
