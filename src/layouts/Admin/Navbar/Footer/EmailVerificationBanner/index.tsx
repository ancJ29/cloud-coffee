import useTranslation from '@/hooks/useTranslation'
import useAuthStore from '@/stores/auth.store'
import { Button } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'

type EmailVerificationBannerProps = {
  onRequestVerifyEmail: () => void
}

export default function EmailVerificationBanner({
  onRequestVerifyEmail,
}: EmailVerificationBannerProps) {
  const t = useTranslation()
  const { user } = useAuthStore()

  if (user?.memo.isEmailVerified) {
    return <></>
  }

  return (
    <Button
      variant="outline"
      color="var(--highlight)"
      c="var(--highlight)"
      fz={12}
      leftSection={<IconAlertTriangle size={20} />}
      onClick={onRequestVerifyEmail}
      size="sm"
    >
      {t('Email not verified')}
    </Button>
  )
}
