import { Stack } from '@mantine/core'
import { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Stack
      bg="var(--auth-surface)"
      h="100dvh"
      w="100dvw"
      align="center"
      justify="center"
      style={{ overflowY: 'auto' }}
    >
      <Stack
        bg="var(--auth-background)"
        w={{ base: '100%', sm: 400 }}
        h="100dvh"
        align="center"
        justify="center"
        gap={20}
      >
        {children}
      </Stack>
    </Stack>
  )
}
