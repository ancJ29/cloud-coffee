import { Language } from '@/configs/i18n'
import { navMenu } from '@/configs/navMenu'
import useWindowResize from '@/hooks/useWindowResize'
import useAuthStore from '@/stores/auth.store'
import { Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContentLayout from './ContentLayout'
import Navbar from './Navbar'

type AdminLayoutProps = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const isMobileScreen = useWindowResize()
  const navigate = useNavigate()
  const { removeToken } = useAuthStore()
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar, open: openNavbar }] =
    useDisclosure(!isMobileScreen)
  const [language] = useState(localStorage.__LANGUAGE__ || Language.VI)

  const handleChangeLanguage = (value: string) => {
    if (value === language) {
      return
    }
    localStorage.__LANGUAGE__ = value || Language.VI
    window.location.reload()
  }

  const logout = useCallback(() => {
    removeToken()
    navigate('/login')
  }, [navigate, removeToken])

  const goToProfilePage = useCallback(() => {
    isMobileScreen && closeNavbar()
    navigate('/profile')
  }, [closeNavbar, isMobileScreen, navigate])

  const goToTimesheetPage = useCallback(() => {
    navigate('/timesheet')
  }, [navigate])

  return (
    <Box>
      <Navbar
        menu={navMenu}
        navbarOpened={navbarOpened}
        language={language}
        onChangeLanguage={handleChangeLanguage}
        onLogout={logout}
        onGoToProfilePage={goToProfilePage}
        onGoToTimesheetPage={goToTimesheetPage}
        toggleNavbar={toggleNavbar}
        closeNavbar={closeNavbar}
        openNavbar={openNavbar}
      />
      <ContentLayout navbarOpened={navbarOpened} toggleNavbar={toggleNavbar}>
        {children}
      </ContentLayout>
    </Box>
  )
}
