import useTranslation from '@/hooks/useTranslation'
import { Anchor, Image } from '@mantine/core'
import ForgotPasswordForm, { ForgotPasswordFormProps } from './ForgotPasswordForm'

export default function ResetPasswordView({ ...props }: ForgotPasswordFormProps) {
  const t = useTranslation()

  return (
    <>
      <Image src="/logo.svg" w={250} />
      <ForgotPasswordForm {...props} />
      <Anchor href="/login" ta="center" fw="bold">
        {t('Back to Login')}
      </Anchor>
    </>
  )
}
