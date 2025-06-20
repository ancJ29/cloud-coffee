import useTranslation from '@/hooks/useTranslation'
import { Text } from '@mantine/core'

export default function WrongUserId() {
  const t = useTranslation()

  return (
    <Text ta="center" fw="bold" fz={20}>
      {t('The staff ID is wrong. Please try again')}
    </Text>
  )
}
