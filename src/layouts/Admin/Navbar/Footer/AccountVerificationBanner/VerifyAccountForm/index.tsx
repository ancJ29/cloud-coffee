import useTranslation from '@/hooks/useTranslation'
import useAuthStore from '@/stores/auth.store'
import { Button, Stack, Text } from '@mantine/core'
import { IconMail } from '@tabler/icons-react'

type VerifyAccountFormProps = {
  onSubmit: () => void
}

export default function VerifyAccountForm({ onSubmit }: VerifyAccountFormProps) {
  const { user } = useAuthStore()
  const t = useTranslation()

  return (
    <Stack gap={20}>
      <Text>
        {t('We will send a verification email to')} <strong>{user?.email}</strong>.{' '}
        {t('Please check your inbox and follow the instructions to verify your account')}
      </Text>
      <Button leftSection={<IconMail size={18} />} variant="light" onClick={onSubmit}>
        {t('Send')}
      </Button>
    </Stack>
  )
}
