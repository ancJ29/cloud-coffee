import useTranslation from '@/hooks/useTranslation'
import { Grid, Text } from '@mantine/core'

export default function Header() {
  const t = useTranslation()

  return (
    <Grid gutter={0} align="start" mt={10}>
      <Grid.Col span={{ base: 5, sm: 2 }}>
        <Text fz={16}>{t('Break at')}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 3.5, sm: 2 }}>
        <Text fz={16} ml={10}>
          {t('Hours')}
        </Text>
      </Grid.Col>
      <Grid.Col span={{ base: 3.5, sm: 2 }}>
        <Text fz={16} ml={10}>
          {t('Minutes')}
        </Text>
      </Grid.Col>
      <Grid.Col span={{ base: 0, sm: 5 }} display={{ base: 'none', sm: 'block' }}>
        <Text fz={16} ml={15}>
          <strong>{t("Don't")}</strong> {t('apply break on these days')}
        </Text>
      </Grid.Col>
      <Grid.Col span={{ base: 0, sm: 1 }} />
    </Grid>
  )
}
