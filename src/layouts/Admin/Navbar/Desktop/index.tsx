import useAuthStore from '@/stores/auth.store'
import { Image, ScrollArea, Stack } from '@mantine/core'
import { NavbarProps } from '..'
import Footer from '../Footer'
import Item from '../Item'
import classes from './index.module.scss'

export default function Desktop({
  menu,
  onLogout,
  onGoToRoot,
  onGoToProfile,
  onRequestVerifyEmail,
  onSettingsClick,
}: NavbarProps) {
  const { user } = useAuthStore()

  return (
    <div className={classes.container}>
      <Image src="/logo-white.svg" className={classes.logo} onClick={onGoToRoot} />
      <ScrollArea
        h={`calc(100dvh - 20px - 10px - 22px - 10px - 60px - ${user?.isEmailVerified ? '0px' : '50px'})`}
        mt={10}
        w="100%"
      >
        <Stack gap={0}>
          {menu.map((menuItem) => (
            <Item key={menuItem.key} menuItem={menuItem} />
          ))}
        </Stack>
      </ScrollArea>
      <Footer
        onLogout={onLogout}
        onGoToProfile={onGoToProfile}
        onRequestVerifyEmail={onRequestVerifyEmail}
        onSettingsClick={onSettingsClick}
      />
    </div>
  )
}
