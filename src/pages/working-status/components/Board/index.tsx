import useTranslation from '@/hooks/useTranslation'
import { Card, Stack, Text } from '@mantine/core'
import { UserShiftStatus } from '../../_configs'
import Filter, { FilterProps } from '../Filter'
import UserList from '../UserList'
import classes from './Board.module.scss'

export type BoardProps = {
  userShiftStatusList: UserShiftStatus[]
} & FilterProps

export default function Board({ userShiftStatusList, ...props }: BoardProps) {
  const t = useTranslation()

  return (
    <Card shadow="md" withBorder className={classes.container}>
      <Stack gap={0} className={classes.header}>
        <Text fw="bold" fz={28} mb={10}>
          {t('User shift status')}
        </Text>
        <Filter {...props} />
      </Stack>
      <div className={classes.content}>
        <UserList userShiftStatusList={userShiftStatusList} />
      </div>
    </Card>
  )
}
