import useTranslation from '@/hooks/useTranslation'
import { Image, Stack, Text } from '@mantine/core'

type StatusMessageProps = {
  success?: boolean
}

export default function StatusMessage({ success }: StatusMessageProps) {
  const t = useTranslation()

  return (
    <Stack align="center" gap={15}>
      <Image src={`/imgs/time-clock/${success ? 'success' : 'failure'}.svg`} w={50} h={50} />
      <Text ta="center" fz={16} fw={600} c={`var(--time-clock-${success ? 'primary' : 'error'})`}>
        {success
          ? t('Please check your email and follow the instructions to verify your account')
          : t('Verification failed. Please try again later')}
      </Text>
    </Stack>
  )
}
