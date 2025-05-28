import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { Text } from '@mantine/core'
import { useCallback } from 'react'

type HeaderProps = {
  user?: User
}

export default function Header({ user }: HeaderProps) {
  const t = useTranslation()

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return 'Good morning'
    }
    if (hour < 18) {
      return 'Good afternoon'
    }
    return 'Good evening'
  }, [])

  return (
    <Text fz={16}>
      {t(getGreeting())},
      <Text inherit span fw="bold">
        {` ${user?.name}`}
      </Text>
    </Text>
  )
}
