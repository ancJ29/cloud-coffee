import { showNotification } from '@/configs/notifications'
import { theme } from '@/configs/themes'
// import { generateColors } from '@mantine/colors-generator'
import { colorsTuple, createTheme, MantineThemeOverride } from '@mantine/core'
import { useState } from 'react'
import useTranslation from './useTranslation'

const THEME_KEY = '__PRIMARY_COLOR__'

function createDynamicTheme(primaryColor: string): MantineThemeOverride {
  return createTheme({
    ...theme,
    colors: {
      ...theme.colors,
      primary: colorsTuple(primaryColor),
    },
  })
}

export function useCustomTheme() {
  const t = useTranslation()
  const [primaryColor, setPrimaryColor] = useState<string>(
    localStorage.getItem(THEME_KEY) || '#3693ff',
  )
  const [theme, setTheme] = useState<MantineThemeOverride>(createDynamicTheme(primaryColor))

  const changPrimaryColor = (color: string) => {
    setPrimaryColor(color)
    localStorage.setItem(THEME_KEY, color)
    setTheme(createDynamicTheme(color))

    showNotification({
      success: true,
      message: t('Primary color changed'),
    })

    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  return { theme, primaryColor, changPrimaryColor }
}
