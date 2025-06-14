import useWindowResize from '@/hooks/useWindowResize'
import useAuthStore from '@/stores/auth.store'
import { MenuItem } from '@/types'
import { Box, Drawer, ScrollArea, Stack } from '@mantine/core'
import Footer from './Footer'
import Header from './Header'
import Item from './Item'
import classes from './Navbar.module.scss'

type NavbarProps = {
  menu: MenuItem[]
  navbarOpened: boolean
  language: string
  onChangeLanguage: (language: string) => void
  onLogout: () => void
  onGoToProfilePage: () => void
  onGoToTimesheetPage: () => void
  toggleNavbar: () => void
  closeNavbar: () => void
  openNavbar: () => void
}

export default function Navbar({
  menu,
  navbarOpened,
  language,
  onChangeLanguage,
  onLogout,
  onGoToProfilePage,
  onGoToTimesheetPage,
  toggleNavbar,
  closeNavbar,
  openNavbar,
}: NavbarProps) {
  const { user } = useAuthStore()
  const isMobileScreen = useWindowResize()

  const content = (
    <>
      <Header
        onClick={onGoToTimesheetPage}
        navbarOpened={navbarOpened}
        toggleNavbar={toggleNavbar}
      />
      <ScrollArea
        h={`calc(100dvh - 36px - 20px - 20px - 72px - 20px - ${user?.isEmailVerified ? '0px' : '50px'})`}
      >
        <Stack gap={0}>
          {menu.map((menuItem) => (
            <Item
              key={menuItem.key}
              menuItem={menuItem}
              navbarOpened={navbarOpened}
              closeNavbar={closeNavbar}
              openNavbar={openNavbar}
            />
          ))}
        </Stack>
      </ScrollArea>
      <Footer
        navbarOpened={navbarOpened}
        language={language}
        onChangeLanguage={onChangeLanguage}
        onLogout={onLogout}
        onGoToProfilePage={onGoToProfilePage}
      />
    </>
  )

  return (
    <>
      <Box
        className={`${classes.boxContainer} ${navbarOpened ? classes.expanded : ''}`}
        visibleFrom="sm"
      >
        {content}
      </Box>
      {isMobileScreen && (
        <Drawer
          opened={navbarOpened}
          onClose={closeNavbar}
          withCloseButton={false}
          padding={0}
          size="xs"
          zIndex={1200}
          classNames={{ body: classes.drawerBody }}
        >
          {content}
        </Drawer>
      )}
    </>
  )
}
