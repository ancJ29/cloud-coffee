import useTranslation from '@/hooks/useTranslation'
import { Anchor, Box, Flex } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

export default function BackToSignIn() {
  const t = useTranslation()

  return (
    <Flex mt={15} justify="center">
      <Anchor href="/login">
        <Flex align="center" gap={5}>
          <IconArrowLeft strokeWidth={1.75} size={18} />
          <Box fw={500}>{t('Back to Sign in')}</Box>
        </Flex>
      </Anchor>
    </Flex>
  )
}
