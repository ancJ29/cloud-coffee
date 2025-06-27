import useWindowResize from '@/hooks/useWindowResize'
import { Flex, Tooltip } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

type InputLabelProps = {
  label: React.ReactNode
  hint?: string
}

export function InputLabel({ label, hint }: InputLabelProps) {
  const isMobile = useWindowResize()

  return (
    <Flex gap={4} align="center">
      <span>{label}</span>
      {hint && (
        <Tooltip
          label={hint}
          position={isMobile ? 'bottom' : 'right'}
          withArrow
          mt={4}
          events={{ hover: true, focus: true, touch: true }}
        >
          <IconInfoCircle size={16} />
        </Tooltip>
      )}
    </Flex>
  )
}
