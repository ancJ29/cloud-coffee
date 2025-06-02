import useTranslation from '@/hooks/useTranslation'
import { ActionIcon, Collapse, Flex, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import Item from '../Item'

export default function IOSGuide() {
  const t = useTranslation()
  const [opened, { toggle }] = useDisclosure(false)

  const mainSteps = [
    <>
      {t('Open')} <strong>{t('Settings')}</strong> {t('app on your phone')}
    </>,
    <>
      {t('Scroll down and tap')} <strong>{t('Privacy & Security')}</strong>
    </>,
    <>
      {t('Tap')} <strong>{t('Location Services')}</strong>
    </>,
    <>
      {t('Make sure')} <strong>{t('Location Services')}</strong> {t('is turned')}{' '}
      <strong>{t('ON')}</strong>
    </>,
    <>
      {t('Scroll down and tap your browser (e.g.,')} <strong>{t('Safari Websites')}</strong>,{' '}
      <strong>{t('Chrome')}</strong>)
    </>,
    <>
      {t('Select')} <strong>{t('Ask Next Time Or When I Share')}</strong> {t('or')}{' '}
      <strong>{t('While Using the App')}</strong>
    </>,
  ]

  const safariSteps = [
    <>
      {t('Go back to the main')} <strong>{t('Settings')}</strong> {t('screen and tap')}{' '}
      <strong>{t('Apps')}</strong>
    </>,
    <>
      {t('Scroll down and tap')} <strong>{t('Safari')}</strong>
    </>,
    <>
      {t('Scroll down and tap')} <strong>{t('Location')}</strong>
    </>,
    <>
      {t('Select')} <strong>{t('Ask')}</strong> {t('or')} <strong>{t('Allow')}</strong>
    </>,
  ]

  const finalStep = (
    <>
      {t('Return to your browser, switch to the previous tab, and')}{' '}
      <strong>{t('refresh the page')}</strong>
    </>
  )

  return (
    <Stack gap={30}>
      {mainSteps.map((step, idx) => (
        <Item
          key={idx}
          index={idx + 1}
          content={step}
          image={`/imgs/location-permission/ios/${idx + 1}.png`}
        />
      ))}
      <Stack gap={10}>
        <Flex justify="space-between" align="center" bg="var(--highlight)" gap={4} onClick={toggle}>
          <Text fz={16} px={10}>
            {t('If you are using Safari, please follow these additional steps')}
          </Text>
          <ActionIcon variant="transparent">
            {opened ? <IconChevronDown color="black" /> : <IconChevronRight color="black" />}
          </ActionIcon>
        </Flex>
        <Collapse in={opened} transitionDuration={300} transitionTimingFunction="linear">
          <Stack gap={30}>
            {safariSteps.map((step, idx) => (
              <Item
                key={mainSteps.length + idx}
                index={mainSteps.length + idx + 1}
                content={step}
                image={`/imgs/location-permission/ios/${mainSteps.length + idx + 1}.png`}
              />
            ))}
          </Stack>
        </Collapse>
      </Stack>
      <Item
        index={mainSteps.length + (opened ? safariSteps.length : 0) + 1}
        content={finalStep}
        image={`/imgs/location-permission/ios/${mainSteps.length + (opened ? safariSteps.length : 0) + 1}.png`}
      />
    </Stack>
  )
}
