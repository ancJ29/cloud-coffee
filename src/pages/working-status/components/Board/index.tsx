import useTranslation from '@/hooks/useTranslation'
import { Card, Stack, Text } from '@mantine/core'
import { UserShiftStatus } from '../../_configs'
import Filter, { FilterProps } from '../Filter'
import UserList from '../UserList'
import classes from './index.module.scss'

export type BoardProps = {
  userShiftStatusList: UserShiftStatus[]
} & FilterProps

export default function Board({ userShiftStatusList, ...props }: BoardProps) {
  const t = useTranslation()

  return (
    <Card shadow="md" withBorder className={classes.container}>
      <Stack gap={20}>
        <Text fw="bold" fz={28}>
          {t('Staff shift status')}
        </Text>
        <Filter {...props} />
      </Stack>
      <div className={classes.content}>
        <UserList userShiftStatusList={userShiftStatusList} />
      </div>
    </Card>
  )
}
