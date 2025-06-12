import useTranslation from '@/hooks/useTranslation'
import { sendVerifyEmail } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useCallback } from 'react'
import StatusMessage from './StatusMessage'
import VerifyAccountForm from './VerifyAccountForm'

type AccountVerificationBannerProps = {
  navbarOpened: boolean
}

export default function AccountVerificationBanner({
  navbarOpened,
}: AccountVerificationBannerProps) {
  const { user } = useAuthStore()
  const t = useTranslation()

  const handSendVerifyEmail = useCallback(async () => {
    const res = await sendVerifyEmail()
    modals.closeAll()
    modals.open({
      title: t('Verify your account'),
      centered: true,
      size: 'md',
      zIndex: 2000,
      children: <StatusMessage success={res?.success} />,
    })
  }, [t])

  const onClick = useCallback(() => {
    modals.open({
      title: t('Verify your account'),
      centered: true,
      size: 'md',
      zIndex: 2000,
      children: <VerifyAccountForm onSubmit={handSendVerifyEmail} />,
    })
  }, [handSendVerifyEmail, t])

  if (user?.isEmailVerified) {
    return <></>
  }

  return navbarOpened ? (
    <Button
      variant="outline"
      color="var(--account-verify-btn)"
      c="var(--account-verify-text)"
      fz={12}
      mb={10}
      leftSection={<IconAlertTriangle size={20} />}
      h={40}
      onClick={onClick}
    >
      {t('Account not verified')}
    </Button>
  ) : (
    <div
      style={{
        height: '40px',
        borderRadius: '6px',
        border: '1px solid var(--account-verify-btn)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
      }}
    >
      <IconAlertTriangle size={20} color="var(--account-verify-text)" />
    </div>
  )
}
