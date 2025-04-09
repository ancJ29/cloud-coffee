import { Stack, Text } from '@mantine/core'
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react'

type MessageProps = {
  success?: boolean
  message: string
}

export default function Message({ success = true, message }: MessageProps) {
  return (
    <Stack gap={10} align="center">
      {success ? (
        <IconCircleCheckFilled color="var(--mantine-color-xGreen-7)" size={80} />
      ) : (
        <IconCircleXFilled color="var(--mantine-color-xRed-5)" size={80} />
      )}
      <Text fw="bold" fz={{ base: 30, sm: 40 }} ta="center">
        {message}
      </Text>
    </Stack>
  )
}
