import { TextInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { RequestPasswordResetRequest } from '@/services/domain'
import { Button, Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

export type ForgotPasswordFormProps = {
  form: UseFormReturnType<RequestPasswordResetRequest>
  onSubmit: (values: RequestPasswordResetRequest) => void
}

export default function ForgotPasswordForm({ form, onSubmit }: ForgotPasswordFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={25} w="80%" mt={25}>
        <TextInput label={t('Enter an email')} {...form.getInputProps('email')} />
        <Button type="submit" mt={10} className="btn-auth">
          {t('Send Reset Password')}
        </Button>
      </Stack>
    </form>
  )
}
