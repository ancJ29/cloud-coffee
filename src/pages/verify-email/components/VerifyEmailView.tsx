import useTranslation from '@/hooks/useTranslation'
import { Loader, Text } from '@mantine/core'
import { VerifyState } from '..'

type VerifyEmailViewProps = {
  state: VerifyState
}

export default function VerifyEmailView({ state }: VerifyEmailViewProps) {
  const t = useTranslation()

  if (state === 'no-token') {
    return (
      <Text ta="center" px={10}>
        {t('The verification link is invalid or has been modified')}
      </Text>
    )
  }

  if (state === 'expired') {
    return (
      <>
        <Text ta="center" px={10}>
          {t('The verification link has expired')}
          <br />
          {t('Please request a new one')}
        </Text>
      </>
    )
  }

  return (
    <>
      <Loader />
      <Text ta="center" px={10}>
        {t('Verifying your email address...')}
      </Text>
    </>
  )
}
