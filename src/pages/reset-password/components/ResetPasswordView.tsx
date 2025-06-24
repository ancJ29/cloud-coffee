import useTranslation from '@/hooks/useTranslation'
import { Anchor, Image } from '@mantine/core'
import ResetPasswordForm, { ResetPasswordFormProps } from './ResetPasswordForm'

export default function ResetPasswordView({ ...props }: ResetPasswordFormProps) {
  const t = useTranslation()

  return (
    <>
      <Image src="/favicon.svg" w={250} />
      <ResetPasswordForm {...props} />
      <Anchor href="/forgot-password" c="var(--auth-anchor)" ta="center">
        {t('Back to Forgot Password?')}
      </Anchor>
    </>
  )
}
