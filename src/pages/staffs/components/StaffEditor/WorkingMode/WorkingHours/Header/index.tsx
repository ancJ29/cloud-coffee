import useTranslation from '@/hooks/useTranslation'
import { Grid, Text } from '@mantine/core'

export default function Header() {
  const t = useTranslation()

  return (
    <Grid gutter={0} align="end" mt={10}>
      <Grid.Col span={4}>
        <Text fz={16}>{t('Day')}</Text>
      </Grid.Col>
      <Grid.Col span={3.5}>
        <Text fz={16}>{t('Start time')}</Text>
      </Grid.Col>
      <Grid.Col span={3.5}>
        <Text fz={16} ml={10}>
          {t('End time')}
        </Text>
      </Grid.Col>
      <Grid.Col span={1} />
    </Grid>
  )
}
