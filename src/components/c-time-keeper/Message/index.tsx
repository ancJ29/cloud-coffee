import { Stack, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

type MessageProps = {
  success?: boolean
  message: string
}

export default function Message({ success = true, message }: MessageProps) {
  return (
    <Stack gap={0} align="center">
      {success ? (
        <IconCheck color="var(--success)" size={80} />
      ) : (
        <IconX color="var(--error)" size={80} />
      )}
      <Text fw="bold" fz={{ base: 30, sm: 40 }} ta="center" style={{ whiteSpace: 'pre-line' }}>
        {message}
      </Text>
    </Stack>
  )
}
