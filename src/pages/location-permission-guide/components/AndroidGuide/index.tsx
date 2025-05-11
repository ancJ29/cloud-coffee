import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'

export default function AndroidGuide() {
  const t = useTranslation()

  const steps = [
    <>{t('On the home screen of your device, find the icon of the browser app you are using')}</>,
    <>{t('Tap and hold the app icon')}</>,
    <>
      {t('Tap on')} <strong>{t('App info')}</strong>
    </>,
    <>
      {t('Select')} <strong>{t('Permissions')}</strong>
    </>,
    <>
      {t('Select')} <strong>{t('Location')}</strong>
    </>,
    <>
      {t('Select')} <strong>{t('Always allow')}</strong> {t('or')}{' '}
      <strong>{t('Allow only while using the app')}</strong> {t('or')}{' '}
      <strong>{t('Always ask')}</strong>
    </>,
    <>{t('Return to your browser to continue using the app')}</>,
  ]

  return (
    <Stack gap={10}>
      {steps.map((step, idx) => (
        <Stack key={idx} gap={-5}>
          <Text fz={16} px={10}>
            {`${idx + 1}. `}
            {step}
          </Text>
        </Stack>
      ))}
    </Stack>
  )
}
