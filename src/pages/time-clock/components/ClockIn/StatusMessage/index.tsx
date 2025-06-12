import useTranslation from '@/hooks/useTranslation'
import { formatTime } from '@/utils'
import { Image, Stack, Text } from '@mantine/core'

type StatusMessageProps = {
  success?: boolean
  message?: string
  timestamp: Date
  address: string
}

export default function StatusMessage({
  success,
  message,
  timestamp,
  address,
}: StatusMessageProps) {
  const t = useTranslation()

  return (
    <Stack align="center" py={15} gap={15}>
      <Image src={`/imgs/time-clock/${success ? 'success' : 'failure'}.svg`} w={50} h={50} />
      <Text fw="bold" c={`var(--time-clock-${success ? 'primary' : 'error'})`} fz={20}>
        {`${t(success ? 'Success' : 'Failure')}!`}
      </Text>
      {success ? (
        <Stack gap={2} w="100%">
          <Text c="dimmed">{`${t('Checked in at')} ${formatTime(timestamp, 'HH:mm A')} ${t('on')} ${formatTime(timestamp, 'DD - MM - YYYY')}`}</Text>
          <Text c="dimmed">{`${t('Location')}: ${address}`}</Text>
        </Stack>
      ) : (
        <Stack gap={2} w="100%" align="center">
          <Text c="dimmed" ta="center">
            {t(message)}
          </Text>
          <Text c="dimmed">{t('Please try again')}</Text>
        </Stack>
      )}
    </Stack>
  )
}
