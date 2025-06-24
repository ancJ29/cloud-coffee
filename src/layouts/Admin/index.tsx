import { navMenu } from '@/configs/navMenu'
import { pushNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import useWindowResize from '@/hooks/useWindowResize'
import { requestVerifyEmail } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import { MenuItem, NotificationType } from '@/types'
import { Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ContentLayout from './ContentLayout'
import Navbar from './Navbar'
import VerifyAccountForm from './VerifyAccountForm'

type AdminLayoutProps = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const t = useTranslation()
  const navigate = useNavigate()
  const isMobileScreen = useWindowResize()
  const { removeToken } = useAuthStore()
  const [opened, { toggle, close, open }] = useDisclosure(!isMobileScreen)

  const logout = useCallback(() => {
    removeToken()
    navigate('/login')
  }, [navigate, removeToken])

  const handleSettingsClick = useCallback(() => {
    pushNotification({
      type: NotificationType.WARNING,
      message: t('Sorry, this feature is implemented yet'),
    })
  }, [t])

  const mobileMenu: MenuItem[] = [
    {
      key: 'profile',
      label: 'Profile',
      url: '/profile',
    },
    {
      key: 'settings',
      label: 'Settings',
      onClick: handleSettingsClick,
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: logout,
    },
  ]

  const handleGoToRoot = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleGoToProfile = useCallback(() => {
    navigate('/profile')
  }, [navigate])

  const handSendVerifyEmail = useCallback(async () => {
    const res = await requestVerifyEmail()
    modals.closeAll()
    if (res?.success) {
      pushNotification({
        type: NotificationType.WARNING,
        message: t('Please check your email and follow the instructions to verify your account'),
      })
    } else {
      pushNotification({
        type: NotificationType.ERROR,
        message: t('Verification failed. Please try again later'),
      })
    }
  }, [t])

  const handleRequestVerifyEmail = useCallback(() => {
    modals.open({
      title: t('Verify your account'),
      centered: true,
      size: 'md',
      zIndex: 2000,
      children: <VerifyAccountForm onSubmit={handSendVerifyEmail} />,
    })
  }, [handSendVerifyEmail, t])

  return (
    <Box>
      <Navbar
        menu={navMenu}
        mobileMenu={mobileMenu}
        onLogout={logout}
        navbarOpened={opened}
        toggleNavbar={toggle}
        closeNavbar={close}
        openNavbar={open}
        onGoToRoot={handleGoToRoot}
        onGoToProfile={handleGoToProfile}
        onRequestVerifyEmail={handleRequestVerifyEmail}
        onSettingsClick={handleSettingsClick}
      />
      <ContentLayout>{children}</ContentLayout>
    </Box>
  )
}
