import useTranslation from '@/hooks/useTranslation'
import { Card, Stack, Text } from '@mantine/core'
import { UserShiftStatus } from '../../_configs'
import Filter, { FilterProps } from '../Filter'
import UserList from '../UserList'

type DashboardViewProps = {
  userShiftStatusList: UserShiftStatus[]
} & FilterProps

export default function DashboardView({ userShiftStatusList, ...props }: DashboardViewProps) {
  const t = useTranslation()

  return (
    <Stack gap={10} align="center">
      <Card shadow="md" withBorder px={20} py={10} radius={8} w={{ base: '100%', sm: '40vw' }}>
        <Text fw="bold" fz={28} mb={10}>
          {t('User shift status')}
        </Text>
        <Filter {...props} />
        <UserList userShiftStatusList={userShiftStatusList} />
      </Card>
    </Stack>
  )
}
