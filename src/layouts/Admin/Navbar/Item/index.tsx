import { MenuItem } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ItemView from './ItemView'

type ItemProps = {
  menuItem: MenuItem
  level?: number
  closeNavbar?: () => void
  isMobile?: boolean
}

export default function Item({ menuItem, level = 0, isMobile = false, closeNavbar }: ItemProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false)
  const [active, setActive] = useState(location.pathname)
  const ml = level * 1

  useEffect(() => {
    setActive(location.pathname)
    setOpened(isActiveSection(menuItem, location.pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const isActiveSection = useCallback((item: MenuItem, activeUrl: string): boolean => {
    if (activeUrl.includes(item.url || '') && !item.onClick) {
      return true
    }
    if (item.subs) {
      return item.subs.some((sub: MenuItem) => isActiveSection(sub, activeUrl))
    }
    return false
  }, [])

  const onClick = useCallback(() => {
    if (menuItem.onClick) {
      menuItem.onClick()
      closeNavbar?.()
      return
    }
    if (!menuItem.subs) {
      closeNavbar?.()
      navigate(menuItem.url || '')
      return
    }
    setOpened(!opened)
  }, [closeNavbar, menuItem, navigate, opened])

  return (
    <ItemView
      menuItem={menuItem}
      opened={opened}
      isActiveSection={isActiveSection(menuItem, active)}
      ml={ml}
      onClick={onClick}
      level={level}
      isMobile={isMobile}
      closeNavbar={closeNavbar}
    />
  )
}
