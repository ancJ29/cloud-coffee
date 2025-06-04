import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { stopMouseEvent } from '@/utils'
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'

type CopyUserUrlButtonProps = {
  user: User
}

export default function CopyUserUrlButton({ user }: CopyUserUrlButtonProps) {
  const baseUrl = window.location.origin
  const t = useTranslation()

  return (
    <CopyButton value={`${baseUrl}/time-clock?userId=${user.id}`} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={t(copied ? 'Copied' : 'Copy')} withArrow position="right">
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            variant="subtle"
            onClick={(e) => {
              stopMouseEvent(e)
              copy()
            }}
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )
}
