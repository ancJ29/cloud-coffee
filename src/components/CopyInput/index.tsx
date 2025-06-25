import useTranslation from '@/hooks/useTranslation'
import { ONE_SECOND } from '@/utils'
import { ActionIcon, CopyButton, Flex, TextInputProps, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { TextInput } from '../TextInput'

export function CopyInput({ ...props }: TextInputProps) {
  const t = useTranslation()
  const value = typeof props.value === 'string' ? props.value : ''

  return (
    <Flex align="center" justify="center" gap={4} w="100%">
      <TextInput w="100%" {...props} />
      <CopyButton value={value} timeout={2 * ONE_SECOND}>
        {({ copied, copy }) => (
          <Tooltip label={t(copied ? 'Copied' : 'Copy')} withArrow position="right">
            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
              {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Flex>
  )
}
