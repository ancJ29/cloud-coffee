import { NotificationType } from '@/types'
import { ONE_SECOND } from '@/utils'
import { notifications } from '@mantine/notifications'

const typeStyles: Record<NotificationType, { backgroundColor: string; defaultMessage?: string }> = {
  info: {
    backgroundColor: 'var(--info)',
    defaultMessage: 'Your changes have been saved',
  },
  warning: {
    backgroundColor: 'var(--warning)',
  },
  error: {
    backgroundColor: 'var(--error)',
    defaultMessage: 'Unknown error',
  },
}

type ShowNotificationProps = {
  message?: string
  type?: NotificationType
  autoClose?: number
  t?: (key: string) => string
}

export function showNotification({
  message,
  type = 'info',
  autoClose = 3 * ONE_SECOND,
  t,
}: ShowNotificationProps) {
  const { backgroundColor, defaultMessage } = typeStyles[type]

  const _message = message || (t ? t(defaultMessage || '') : '')

  notifications.show({
    message: _message,
    autoClose,
    color: backgroundColor,
    radius: 0,
    withCloseButton: false,
    style: {
      backgroundColor,
    },
    styles: {
      root: {
        backgroundColor,
      },
      description: {
        color: 'white',
        textAlign: 'center',
        padding: '6px',
      },
    },
  })
}
