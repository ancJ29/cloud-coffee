import useTranslation from '@/hooks/useTranslation'
import { useMantineColorScheme } from '@mantine/core'
import { IconBrightnessUp, IconMoon } from '@tabler/icons-react'
import MenuItem from '../MenuItem'

export default function ThemeModeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const t = useTranslation()

  return (
    <MenuItem
      label={t('Theme mode')}
      leftIcon={
        colorScheme === 'light' ? (
          <IconBrightnessUp size={20} strokeWidth={1.5} />
        ) : (
          <IconMoon size={20} strokeWidth={1.5} />
        )
      }
      onClick={toggleColorScheme}
    />
  )
}
