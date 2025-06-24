import useTranslation from '@/hooks/useTranslation'
import { Loader, Text } from '@mantine/core'
import { VerifyState } from '..'
import Background from './Background'

type VerifyEmailViewProps = {
  state: VerifyState
}

export default function VerifyEmailView({ state }: VerifyEmailViewProps) {
  const t = useTranslation()

  if (state === 'no-token') {
    return (
      <Background>
        <Text ta="center" px={10}>
          {t('The verification link is invalid or has been modified')}
        </Text>
      </Background>
    )
  }

  if (state === 'expired') {
    return (
      <Background>
        <Text ta="center" px={10}>
          {t('The verification link has expired')}
          <br />
          {t('Please request a new one')}
        </Text>
      </Background>
    )
  }

  return (
    <Background>
      <Loader />
      <Text ta="center" px={10}>
        {t('Verifying your email address...')}
      </Text>
    </Background>
  )
}
