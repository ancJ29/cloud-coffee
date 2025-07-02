import useTranslation from '@/hooks/useTranslation'
import { Card, Stack, Text } from '@mantine/core'
import { UserAttendanceStatus } from '../../_configs'
import Filter, { FilterProps } from '../Filter'
import UserList from '../UserList'
import classes from './index.module.scss'

export type BoardProps = {
  userAttendanceStatusList: UserAttendanceStatus[]
} & FilterProps

export default function Board({ userAttendanceStatusList, ...props }: BoardProps) {
  const t = useTranslation()

  return (
    <Card shadow="md" withBorder className={classes.container}>
      <Stack gap={20}>
        <Text fw="bold" fz={28}>
          {t('Staff attendance status')}
        </Text>
        <Filter {...props} />
      </Stack>
      <div className={classes.content}>
        <UserList userAttendanceStatusList={userAttendanceStatusList} />
      </div>
    </Card>
  )
}
