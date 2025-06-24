import useTranslation from '@/hooks/useTranslation'
import { Box, Button, Text } from '@mantine/core'
import classes from './index.module.scss'

type HeaderProps = {
  onAddStaff: () => void
}

export default function Header({ onAddStaff }: HeaderProps) {
  const t = useTranslation()

  return (
    <Box className={classes.container}>
      <Text className={classes.title}>{t('Staff management')}</Text>
      <Button className={classes.button} onClick={onAddStaff}>
        {t('Add staff')}
      </Button>
    </Box>
  )
}
