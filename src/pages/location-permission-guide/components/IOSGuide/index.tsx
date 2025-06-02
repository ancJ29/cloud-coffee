import useTranslation from '@/hooks/useTranslation'
import { Image, Stack, Text } from '@mantine/core'

export default function IOSGuide() {
  const t = useTranslation()

  const steps = [
    <>
      {t('Open the')} <strong>{t('Settings')}</strong> {t('app on your phone')}
    </>,
    <>
      {t('Scroll down and select')} <strong>{t('App')}</strong>
    </>,
    <>
      {t('Scroll down and select')} <strong>Chrome</strong> ({t('or the browser you are using')})
    </>,
    <>
      {t('Select')} <strong>{t('Location')}</strong>
    </>,
    <>
      {t('Select')} <strong>{t('While Using the App')}</strong> {t('or')}{' '}
      <strong>{t('Ask Next Time or When I Share')}</strong>
    </>,
    <>{t('Return to your browser and refresh the page to continue')}</>,
  ]

  return (
    <Stack gap={30}>
      {steps.map((step, idx) => (
        <Stack key={idx} gap={-5}>
          <Text fz={16} px={20}>
            {`${idx + 1}. `}
            {step}
          </Text>
          <Image src={`/imgs/location-permission/ios/${idx + 1}.png`} />
        </Stack>
      ))}
    </Stack>
  )
}
