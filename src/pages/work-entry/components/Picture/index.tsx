import useTranslation from '@/hooks/useTranslation'
import { Button, Flex, Image } from '@mantine/core'
import IconCorner from '../IconCorner'
import classes from './Picture.module.scss'

type PictureProps = {
  imageSrc: string | null
  onRetry: () => void
  onConfirm: () => void
}

export default function Picture({ imageSrc, onRetry, onConfirm }: PictureProps) {
  const t = useTranslation()

  return (
    <>
      <div className={classes.container}>
        <Image src={imageSrc} className={classes.image} />
        <IconCorner position="top-left" top="0" left="0" />
        <IconCorner position="top-right" top="0" right="0" />
        <IconCorner position="bottom-left" bottom="0" left="0" />
        <IconCorner position="bottom-right" bottom="0" right="0" />
      </div>
      <Flex gap={20} w="100%" align="center" justify="center" mt={40}>
        <Button color="var(--warning)" onClick={onRetry} w={120}>
          {t('Retry')}
        </Button>
        <Button color="var(--success)" onClick={onConfirm} w={120}>
          {t('Confirm')}
        </Button>
      </Flex>
    </>
  )
}
