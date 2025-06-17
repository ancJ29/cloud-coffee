import Avatar from '@/components/common/Avatar'
import useTranslation from '@/hooks/useTranslation'
import useWindowResize from '@/hooks/useWindowResize'
import useAuthStore from '@/stores/auth.store'
import { showNotImplementedModal } from '@/utils'
import { Button, Menu, UnstyledButton } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import LanguageSelector from './LanguageSelector'
import MenuItem from './MenuItem'
import ThemeModeSwitch from './ThemeModeSwitch'
import UserInformation from './UserInformation'

type ProfileProps = {
  navbarOpened: boolean
  language: string
  onChangeLanguage: (language: string) => void
  onLogout: () => void
  onGoToProfilePage: () => void
}

export default function Profile({
  navbarOpened,
  language,
  onChangeLanguage,
  onLogout,
  onGoToProfilePage,
}: ProfileProps) {
  const t = useTranslation()
  const isMobileScreen = useWindowResize()
  const { user } = useAuthStore()
  const [opened, setOpened] = useState(false)

  const handleCloseMenu = useCallback(() => {
    setOpened(false)
  }, [])

  const handleSettingClick = useCallback(() => {
    showNotImplementedModal(t)
  }, [t])

  return (
    <Menu
      width={isMobileScreen ? 200 : 250}
      position="top-start"
      radius={10}
      shadow="md"
      offset={8}
      opened={opened}
      onChange={setOpened}
      zIndex={isMobileScreen ? 1200 : 200}
    >
      <Menu.Target>
        <UnstyledButton>
          <UserInformation navbarOpened={navbarOpened} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown p={10}>
        <MenuItem
          leftIcon={<Avatar size={20} src={user?.avatar} />}
          label={t('Profile')}
          onCloseMenu={handleCloseMenu}
          onClick={onGoToProfilePage}
        />

        <Menu.Divider p={5} />

        <LanguageSelector
          language={language}
          onChangeLanguage={onChangeLanguage}
          onCloseMenu={handleCloseMenu}
        />

        <ThemeModeSwitch />

        <MenuItem
          leftIcon={<IconSettings size={20} strokeWidth={1.5} />}
          label={t('Settings')}
          onCloseMenu={handleSettingClick}
        />

        <Button fullWidth mt={15} variant="default" size="xs" onClick={onLogout}>
          {t('Logout')}
        </Button>
      </Menu.Dropdown>
    </Menu>
  )
}
