import useTranslation from '@/hooks/useTranslation'
import useAuthStore from '@/stores/auth.store'
import { Button } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'

type AccountVerificationBannerProps = {
  onRequestVerifyEmail: () => void
}

export default function AccountVerificationBanner({
  onRequestVerifyEmail,
}: AccountVerificationBannerProps) {
  const t = useTranslation()
  const { user } = useAuthStore()

  if (user?.isEmailVerified) {
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
