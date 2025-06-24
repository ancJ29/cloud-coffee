import useTranslation from '@/hooks/useTranslation'
import { Anchor, Image } from '@mantine/core'
import ForgotPasswordForm, { ForgotPasswordFormProps } from './ForgotPasswordForm'

export default function ForgotPasswordView({ ...props }: ForgotPasswordFormProps) {
  const t = useTranslation()

  return (
    <>
      <Image src="/favicon.svg" w={250} />
      <ForgotPasswordForm {...props} />
      <Anchor href="/login" ta="center" fw="bold" c="var(--auth-anchor)">
        {t('Back to Login')}
      </Anchor>
    </>
  )
}
