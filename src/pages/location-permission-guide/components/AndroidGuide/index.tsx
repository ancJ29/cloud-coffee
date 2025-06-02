import useTranslation from '@/hooks/useTranslation'
import { Stack } from '@mantine/core'
import Item from '../Item'

export default function AndroidGuide() {
  const t = useTranslation()

  const steps = [
    <>{t('On the home screen of your device, find the icon of the browser app you are using')}</>,
    <>{t('Tap and hold the app icon')}</>,
    <>
      {t('Tap')} <strong>{t('App Info')}</strong>
    </>,
    <>
      {t('Tap')} <strong>{t('Permissions')}</strong>
    </>,
    <>
      {t('Tap')} <strong>{t('Location')}</strong>
    </>,
    <>
      {t('Select')} <strong>{t('Always allow')}</strong> {t('or')}{' '}
      <strong>{t('Allow only while using the app')}</strong> {t('or')}{' '}
      <strong>{t('Always ask')}</strong>
    </>,
    <>
      {' '}
      {t('Return to your browser, switch to the previous tab, and')}{' '}
      <strong>{t('refresh the page')}</strong>
    </>,
  ]

  return (
    <Stack gap={10}>
      {steps.map((step, idx) => (
        <Item key={idx} index={idx + 1} content={step} />
      ))}
    </Stack>
  )
}
