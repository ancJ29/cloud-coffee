import useTranslation from '@/hooks/useTranslation'
import { Flex, Image, SimpleGrid, Text } from '@mantine/core'

type HeaderProps = {
  isCapturing: boolean
  onFlash: () => void
  onRotateCamera: () => void
  onReCapture: () => void
}

export default function Header({ isCapturing, onFlash, onRotateCamera, onReCapture }: HeaderProps) {
  const t = useTranslation()

  return (
    <SimpleGrid cols={3} w="100%" h={50}>
      <Flex gap={5} align="center" onClick={onReCapture} pl={10}>
        {isCapturing && (
          <>
            <Image src="/imgs/time-clock/chevron-left.svg" width={20} height={20} />
            <Text c="var(--time-clock-accent-color)">{t('Re capture')}</Text>
          </>
        )}
      </Flex>

      <Flex justify="center" align="center">
        {!isCapturing && (
          <Image src="/imgs/time-clock/bolt.svg" width={20} height={20} onClick={onFlash} />
        )}
      </Flex>

      <Flex justify="flex-end" align="center" pr={20}>
        {!isCapturing && (
          <Image
            src="/imgs/time-clock/rotate.svg"
            width={20}
            height={20}
            onClick={onRotateCamera}
          />
        )}
      </Flex>
    </SimpleGrid>
  )
}
