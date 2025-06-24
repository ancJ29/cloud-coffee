import useTranslation from '@/hooks/useTranslation'
import useAuthStore from '@/stores/auth.store'
import { Avatar, Button, Menu, UnstyledButton } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import UserInformation from './UserInformation'

type ProfileProps = {
  onLogout: () => void
  onGoToProfile: () => void
  onSettingsClick: () => void
}

export default function Profile({ onLogout, onGoToProfile, onSettingsClick }: ProfileProps) {
  const { user } = useAuthStore()
  const t = useTranslation()
  const [opened, setOpened] = useState(false)

  const handleCloseMenu = useCallback(() => {
    setOpened(false)
  }, [])

  return (
    <Menu
      width={200}
      position="top-start"
      radius={10}
      shadow="md"
      offset={0}
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <UnstyledButton>
          <UserInformation menuOpened={opened} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown p={10}>
        <MenuItem
          leftIcon={<Avatar size={20} src={user?.avatar} />}
          label={t('Profile')}
          onCloseMenu={handleCloseMenu}
          onClick={onGoToProfile}
        />

        <Menu.Divider p={0} />

        <MenuItem
          leftIcon={<IconSettings size={16} strokeWidth={1.5} />}
          label={t('Settings')}
          onCloseMenu={onSettingsClick}
        />

        <Button fullWidth mt={4} variant="default" size="xs" onClick={onLogout}>
          {t('Logout')}
        </Button>
      </Menu.Dropdown>
    </Menu>
  )
}
