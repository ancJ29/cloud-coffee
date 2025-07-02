import useTranslation from '@/hooks/useTranslation'
import { Grid } from '@mantine/core'
import classes from './index.module.scss'

export default function Header() {
  const t = useTranslation()

  return (
    <Grid className={classes.container}>
      <Grid.Col span={3} className={classes.nameItem}>
        {t('Name')}
      </Grid.Col>
      <Grid.Col span={2} className={classes.centerItem}>
        {t('Total')}
      </Grid.Col>
      <Grid.Col span={2} className={classes.centerItem}>
        {t('Clock in')}
      </Grid.Col>
      <Grid.Col span={2} className={classes.centerItem}>
        {t('Clock out')}
      </Grid.Col>
      <Grid.Col span={2.5} className={classes.centerItem}>
        {t('Venue')}
      </Grid.Col>
      <Grid.Col span={0.5} className={classes.centerItem} />
    </Grid>
  )
}
