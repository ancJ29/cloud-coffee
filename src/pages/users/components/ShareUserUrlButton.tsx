import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import logger from '@/services/logger'
import { stopMouseEvent } from '@/utils'
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy, IconShare } from '@tabler/icons-react'
import { useCallback } from 'react'
import { isMobile } from 'react-device-detect'

type ShareUserUrlButtonProps = {
  user: User
}

export default function ShareUserUrlButton({ user }: ShareUserUrlButtonProps) {
  const baseUrl = window.location.origin
  const shareUrl = `${baseUrl}/time-clock?userId=${user.id}`
  const t = useTranslation()

  const handleShare = useCallback(
    async (e: React.MouseEvent) => {
      stopMouseEvent(e)
      try {
        await navigator.share({
          title: t('Checkin link'),
          url: shareUrl,
        })
      } catch (error) {
        logger.error(`Failed to share: ${error}`)
      }
    },
    [shareUrl, t],
  )

  if (isMobile) {
    return (
      <ActionIcon variant="subtle" onClick={handleShare}>
        <IconShare size={20} />
      </ActionIcon>
    )
  }

  return (
    <CopyButton value={shareUrl} timeout={2000}>
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
