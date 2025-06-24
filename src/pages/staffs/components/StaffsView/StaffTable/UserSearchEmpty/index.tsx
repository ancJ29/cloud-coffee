import useTranslation from '@/hooks/useTranslation'
import { Text } from '@mantine/core'

type UserSearchEmptyProps = {
  keyword: string
}

export default function UserSearchEmpty({ keyword }: UserSearchEmptyProps) {
  const t = useTranslation()

  return (
    <Text c="var(--no-result)" fw={700} ta="center" mt={50}>
      {t('No staff named was found', keyword)}
    </Text>
  )
}
