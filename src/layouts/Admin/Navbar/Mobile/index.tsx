import { Box, Burger, Collapse, Image, Stack } from '@mantine/core'
import { useEffect, useRef } from 'react'
import { NavbarProps } from '..'
import Item from '../Item'
import classes from './index.module.scss'

export default function Mobile({
  menu,
  mobileMenu,
  navbarOpened,
  toggleNavbar,
  closeNavbar,
  onGoToRoot,
}: NavbarProps) {
  const collapseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!navbarOpened && collapseRef.current?.contains(document.activeElement)) {
      ;(document.activeElement as HTMLElement).blur()
    }
  }, [navbarOpened])

  return (
    <Box className={classes.container}>
      <Image src="/logo-white.svg" className={classes.logo} onClick={onGoToRoot} />

      <Burger opened={navbarOpened} onClick={toggleNavbar} color="white" size={20} />

      <Collapse
        ref={collapseRef}
        in={navbarOpened}
        className={classes.collapse}
        transitionDuration={300}
        transitionTimingFunction="linear"
      >
        <Stack gap={0} align="center">
          {menu.map((menuItem) => (
            <Item key={menuItem.key} menuItem={menuItem} isMobile closeNavbar={closeNavbar} />
          ))}
          {mobileMenu.map((menuItem) => (
            <Item key={menuItem.key} menuItem={menuItem} isMobile closeNavbar={closeNavbar} />
          ))}
        </Stack>
      </Collapse>
    </Box>
  )
}
