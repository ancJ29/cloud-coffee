import { PasswordInput, PasswordStrengthInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'

export type ResetPasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ResetPasswordForm({ form, onSubmit }: ResetPasswordFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={30} w="80%" mt={25}>
        <PasswordStrengthInput
          label={t('New password')}
          {...form.getInputProps('newPassword')}
          mt={10}
        />
        <PasswordInput
          label={t('Confirm new password')}
          {...form.getInputProps('confirmPassword')}
          mt={10}
        />

        <Button fullWidth type="submit" mt={10} className="btn-auth">
          {t('Reset password')}
        </Button>
      </Stack>
    </form>
  )
}
