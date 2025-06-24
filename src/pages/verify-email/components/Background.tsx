import { Stack } from '@mantine/core'

type BackgroundProps = {
  children: React.ReactNode
}

export default function Background({ children }: BackgroundProps) {
  return (
    <Stack align="center" justify="center" h="100dvh" w="100dvw">
      {children}
    </Stack>
  )
}
