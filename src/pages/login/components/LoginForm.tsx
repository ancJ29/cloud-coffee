import { PasswordInput, TextInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { LoginRequest } from '@/services/domain'
import { Anchor, Button, Flex, Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

export type LoginFormProps = {
  form: UseFormReturnType<LoginRequest>
  onSubmit: (values: LoginRequest) => void
}

export default function LoginForm({ form, onSubmit }: LoginFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={25} w="80%" mt={25}>
        <TextInput label={t('Enter an email')} {...form.getInputProps('email')} />
        <PasswordInput label={t('Enter a password')} {...form.getInputProps('password')} mt={10} />

        <Flex justify="end">
          <Anchor c="var(--auth-anchor)" href="/forgot-password">
            {t('Forgot your password?')}
          </Anchor>
        </Flex>

        <Button fullWidth type="submit" className="auth-btn">
          {t('Sign in')}
        </Button>
      </Stack>
    </form>
  )
}
