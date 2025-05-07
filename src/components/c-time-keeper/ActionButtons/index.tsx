import useTranslation from '@/hooks/useTranslation'
import { Box, Button, Flex } from '@mantine/core'

type ActionButtonsProps = {
  isVisible: boolean
  onRetry: () => void
  onSubmit: () => void
}

export default function ActionButtons({ isVisible, onRetry, onSubmit }: ActionButtonsProps) {
  const t = useTranslation()

  if (!isVisible) {
    return <Box h={60} />
  }

  return (
    <Flex gap={20} w="100%" align="center" justify="center" mt={30}>
      <Button color="var(--warning)" onClick={onRetry} w={120}>
        {t('Retry')}
      </Button>
      <Button color="var(--success)" onClick={onSubmit} w={120}>
        {t('Confirm')}
      </Button>
    </Flex>
  )
}
