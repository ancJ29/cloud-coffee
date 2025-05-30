import useTranslation from '@/hooks/useTranslation'
import { Flex, SimpleGrid, Text } from '@mantine/core'
import { IconBoltFilled, IconChevronLeft, IconRotate } from '@tabler/icons-react'

type HeaderProps = {
  isCapturing: boolean
  onFlash: () => void
  onRotateCamera: () => void
  onReCapture: () => void
}

export default function Header({ isCapturing, onFlash, onRotateCamera, onReCapture }: HeaderProps) {
  const t = useTranslation()

  return (
    <SimpleGrid cols={3} w="100%" h={50} pr={20} pl={10}>
      <Flex gap={2} align="center" onClick={onReCapture}>
        {isCapturing && (
          <>
            <IconChevronLeft color="var(--time-clock-accent-color)" style={{ cursor: 'pointer' }} />
            <Text c="var(--time-clock-accent-color)">{t('Re capture')}</Text>
          </>
        )}
      </Flex>

      <Flex justify="center" align="center">
        {!isCapturing && (
          <IconBoltFilled
            color="var(--time-clock-accent-color)"
            onClick={onFlash}
            style={{ cursor: 'pointer' }}
          />
        )}
      </Flex>

      <Flex justify="flex-end" align="center">
        {!isCapturing && (
          <IconRotate
            color="var(--time-clock-accent-color)"
            onClick={onRotateCamera}
            style={{ cursor: 'pointer' }}
          />
        )}
      </Flex>
    </SimpleGrid>
  )
}
