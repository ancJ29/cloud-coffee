import { NotificationType } from '@/types'
import { ONE_SECOND } from '@/utils'
import { notifications } from '@mantine/notifications'

const typeStyles: Record<NotificationType, { backgroundColor: string; defaultMessage?: string }> = {
  INFO: {
    backgroundColor: 'var(--info)',
    defaultMessage: 'Your changes have been saved',
  },
  WARNING: {
    backgroundColor: 'var(--warning)',
  },
  ERROR: {
    backgroundColor: 'var(--error)',
    defaultMessage: 'Unknown error',
  },
}

type pushNotificationProps = {
  message?: string
  type?: NotificationType
  autoClose?: number
  t?: (key: string) => string
}

export function pushNotification({
  message,
  type = NotificationType.INFO,
  autoClose = 3 * ONE_SECOND,
  t,
}: pushNotificationProps) {
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
