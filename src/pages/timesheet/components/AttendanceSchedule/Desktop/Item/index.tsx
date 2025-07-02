import { Avatar } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { AttendanceLog, User } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useVenueStore from '@/stores/venue.store'
import { formatDuration, formatTime, ONE_HOUR, unique } from '@/utils'
import { Accordion, ActionIcon, Flex, Grid, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconCameraPin, IconChevronRight } from '@tabler/icons-react'
import { useCallback, useMemo, useState } from 'react'
import store from '../../../../_attendance.store'
import AttendanceLogImage from '../../AttendanceLogImage'
import TimeSelect from '../TimeSelect'
import classes from './index.module.scss'

type ItemProps = {
  user?: User
  attendanceLogs: AttendanceLog[]
}

export default function Item({ user, attendanceLogs }: ItemProps) {
  const [opened, setOpened] = useState(true)

  const total = useMemo(() => {
    const totalMilliseconds = attendanceLogs.some((attendanceLog) => attendanceLog.end != null)
      ? attendanceLogs.reduce((acc, attendanceLog) => {
          if (attendanceLog.end == null) {
            return acc
          }

          let duration = attendanceLog.end - attendanceLog.start
          if (attendanceLog.end < attendanceLog.start) {
            duration += 24 * ONE_HOUR
          }

          return acc + duration
        }, 0)
      : null
    return totalMilliseconds
  }, [attendanceLogs])

  if (!user) {
    return <></>
  }

  return (
    <Accordion
      key={user.id}
      variant="contained"
      radius={0}
      chevronPosition="left"
      transitionDuration={300}
      classNames={classes}
      defaultValue={user.id}
    >
      <Accordion.Item value={user.id}>
        <Accordion.Control onClick={() => setOpened(!opened)} bg="var(--attendance-accordion)">
          <UserInformation
            user={user}
            total={total}
            opened={opened}
            attendanceLogs={attendanceLogs}
          />
        </Accordion.Control>
        <Accordion.Panel>
          {attendanceLogs.map((attendanceLog) => (
            <AttendanceInformation key={attendanceLog.id} attendanceLog={attendanceLog} />
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

function UserInformation({
  user,
  total,
  opened,
  attendanceLogs,
}: {
  user: User
  total: number | null
  opened: boolean
  attendanceLogs: AttendanceLog[]
}) {
  const t = useTranslation()
  const { roles } = useRoleStore()
  const { venues } = useVenueStore()

  const _venues = useMemo(() => {
    return unique(attendanceLogs.map((e) => venues.get(e.venueId)?.name))
      .filter(Boolean)
      .join(', ')
  }, [attendanceLogs, venues])

  return (
    <Grid>
      <Grid.Col span={3} className={classes.nameItem}>
        <Flex gap={5} w="fit-content" align="center">
          <IconChevronRight
            size={18}
            stroke={2}
            style={{
              transform: opened ? 'rotate(90deg)' : 'none',
              transition: 'transform 200ms ease',
            }}
          />
          <Avatar size={44} src={user?.avatar} />
          <Stack gap={0}>
            <Text fw={600}>{user?.name || ''}</Text>
            <Text c="dimmed" fz={10}>
              {t(roles.get(user?.roleId || '')?.name || '')}
            </Text>
          </Stack>
        </Flex>
      </Grid.Col>
      <Grid.Col span={2} className={classes.infoItem}>
        {formatDuration(total)}
      </Grid.Col>
      <Grid.Col span={2} className={classes.infoItem}>
        -
      </Grid.Col>
      <Grid.Col span={2} className={classes.infoItem}>
        -
      </Grid.Col>
      <Grid.Col span={2.5} className={classes.infoItem}>
        <Text className={classes.venueText}>{_venues}</Text>
      </Grid.Col>
    </Grid>
  )
}

function AttendanceInformation({ attendanceLog }: { attendanceLog: AttendanceLog }) {
  const { venues } = useVenueStore()

  const total = useMemo(() => {
    if (!attendanceLog.end) {
      return
    }
    let totalMilliseconds = attendanceLog.end - attendanceLog.start
    if (attendanceLog.end < attendanceLog.start) {
      totalMilliseconds += 24 * ONE_HOUR
    }
    return totalMilliseconds
  }, [attendanceLog])

  const onClick = useCallback(() => {
    modals.open({
      withCloseButton: false,
      centered: true,
      size: 'xl',
      children: <AttendanceLogImage attendanceLog={attendanceLog} />,
    })
  }, [attendanceLog])

  return (
    <Grid className={classes.attendanceContainer}>
      <Grid.Col span={3} className={classes.dateItem}>
        <Text w={32} c="dimmed">
          {formatTime(attendanceLog.start, 'ddd')}
        </Text>
        {formatTime(attendanceLog.start, 'DD/MM')}
      </Grid.Col>
      <Grid.Col span={2} className={classes.attendanceItem}>
        {formatDuration(total || 0) ?? '-'}
      </Grid.Col>
      <Grid.Col span={2} className={classes.timeItem}>
        <TimeSelect
          value={attendanceLog.start}
          onChangeValue={(value) =>
            store.changeCheckInTime(attendanceLog.userId, attendanceLog.id, value)
          }
        />
      </Grid.Col>
      <Grid.Col span={2} className={classes.timeItem}>
        <TimeSelect
          value={attendanceLog.end}
          onChangeValue={(value) =>
            store.changeCheckOutTime(attendanceLog.userId, attendanceLog.id, value)
          }
        />
      </Grid.Col>
      <Grid.Col span={2.5} className={classes.attendanceItem}>
        <Text className={classes.venueText}>{venues.get(attendanceLog.venueId)?.name || '-'}</Text>
      </Grid.Col>
      <Grid.Col span={0.5} className={classes.attendanceItem}>
        <ActionIcon variant="transparent" onClick={onClick}>
          <IconCameraPin stroke={1.5} />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  )
}
