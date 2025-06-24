import { PasswordInput, PasswordStrengthInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'

export type ChangePasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ChangePasswordForm({ form, onSubmit }: ChangePasswordFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={35} w={{ base: '80%', sm: 400 }}>
        <PasswordInput
          label={t('Password')}
          withAsterisk
          {...form.getInputProps('currentPassword')}
        />
        <PasswordStrengthInput
          label={t('New password')}
          withAsterisk
          {...form.getInputProps('newPassword')}
        />
        <PasswordInput
          label={t('Confirm new password')}
          withAsterisk
          {...form.getInputProps('confirmPassword')}
        />
        <Button mt={10} type="submit">
          {t('Update')}
        </Button>
      </Stack>
    </form>
  )
}
