import { Notifications as MantineNotifications } from '@mantine/notifications'

export default function Notifications() {
  return (
    <MantineNotifications
      position="top-center"
      zIndex={9999}
      w={{ base: '100%', sm: '400' }}
      styles={{
        root: {
          top: 0,
          pointerEvents: 'none',
        },
      }}
    />
  )
}
