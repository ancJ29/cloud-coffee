import { MenuItem } from '@/types'
import Desktop from './Desktop'
import Mobile from './Mobile'

export type NavbarProps = {
  menu: MenuItem[]
  mobileMenu: MenuItem[]
  onLogout: () => void
  navbarOpened: boolean
  toggleNavbar: () => void
  closeNavbar: () => void
  openNavbar: () => void
  onGoToRoot: () => void
  onGoToProfile: () => void
  onRequestVerifyEmail: () => void
  onSettingsClick: () => void
}

export default function Navbar({ ...props }: NavbarProps) {
  return (
    <>
      <Desktop {...props} />
      <Mobile {...props} />
    </>
  )
}
