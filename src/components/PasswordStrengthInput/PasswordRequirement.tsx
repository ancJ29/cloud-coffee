import useTranslation from '@/hooks/useTranslation'
import { Box, Center, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

type PasswordRequirement = {
  label: string
  meets: boolean
}

export function PasswordRequirement({ label, meets }: PasswordRequirement) {
  const t = useTranslation()

  return (
    <Text component="div" c={meets ? 'var(--success)' : 'var(--error)'} mt={5} fz={12}>
      <Center inline>
        {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
        <Box ml={7}>{t(label)}</Box>
      </Center>
    </Text>
  )
}
