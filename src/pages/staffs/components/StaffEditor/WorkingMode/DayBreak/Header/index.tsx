import useTranslation from '@/hooks/useTranslation'
import { Grid, Text } from '@mantine/core'

export default function Header() {
  const t = useTranslation()

  return (
    <Grid gutter={0} align="end" mt={10}>
      <Grid.Col span={2}>
        <Text fz={16}>{t('Break at')}</Text>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text fz={16} ml={10}>
          {t('Hours')}
        </Text>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text fz={16} ml={10}>
          {t('Minutes')}
        </Text>
      </Grid.Col>
      <Grid.Col span={5}>
        <Text fz={16} ml={10}>
          <strong>{t("Don't")}</strong> {t('apply break on these days')}
        </Text>
      </Grid.Col>
      <Grid.Col span={1} />
    </Grid>
  )
}
