import { Flex, Tooltip } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

type InputLabelProps = {
  label: React.ReactNode
  hint?: string
}

export function InputLabel({ label, hint }: InputLabelProps) {
  return (
    <Flex gap={4} align="center">
      <span>{label}</span>
      {hint && (
        <Tooltip label={hint} position="right" withArrow mt={4}>
          <IconInfoCircle size={16} />
        </Tooltip>
      )}
    </Flex>
  )
}
