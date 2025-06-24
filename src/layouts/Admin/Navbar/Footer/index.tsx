import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'
import AccountVerificationBanner from './AccountVerificationBanner'
import Profile from './Profile'

type FooterProps = {
  onLogout: () => void
  onGoToProfile: () => void
  onRequestVerifyEmail: () => void
  onSettingsClick: () => void
}

export default function Footer({
  onLogout,
  onGoToProfile,
  onRequestVerifyEmail,
  onSettingsClick,
}: FooterProps) {
  const t = useTranslation()

  return (
    <Stack gap={6} w="100%">
      <AccountVerificationBanner onRequestVerifyEmail={onRequestVerifyEmail} />

      <Profile
        onLogout={onLogout}
        onGoToProfile={onGoToProfile}
        onSettingsClick={onSettingsClick}
      />

      <Text fz={8} c="dimmed" ta="right">
        {`${t('Version')}: ${import.meta.env.VITE_APP_VERSION} (${import.meta.env.VITE_APP_BUILD})`}
      </Text>
    </Stack>
  )
}
