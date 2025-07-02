import { Avatar } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { AttendanceLog, User } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useVenueStore from '@/stores/venue.store'
import { formatDuration, formatTime, ONE_HOUR } from '@/utils'
import { ActionIcon, Box, Card, Collapse, Flex, Group, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconCameraPin, IconChevronDown } from '@tabler/icons-react'
import { ReactNode, useCallback, useMemo } from 'react'
import AttendanceLogImage from '../../AttendanceLogImage'
import classes from './index.module.scss'

type ItemProps = {
  user?: User
  attendanceLogs: AttendanceLog[]
}

export default function Item({ user, attendanceLogs }: ItemProps) {
  const [opened, { toggle }] = useDisclosure(false)

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      toggle()
    },
    [toggle],
  )

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
    <Card shadow="md" withBorder p={12} radius={8}>
      <UserInformation user={user} total={total} onClick={handleClick} />
      <Wrapper isShown={attendanceLogs.length > 0} opened={opened} onClick={handleClick}>
        {attendanceLogs.map((attendanceLog) => (
          <AttendanceLogInformation key={attendanceLog.id} attendanceLog={attendanceLog} />
        ))}
      </Wrapper>
    </Card>
  )
}

function UserInformation({
  user,
  total,
  onClick,
}: {
  user: User
  total: number | null
  onClick: (event: React.MouseEvent) => void
}) {
  const { roles } = useRoleStore()
  const t = useTranslation()

  return (
    <Stack gap={0} onClick={onClick}>
      <Flex gap={5} w="fit-content" align="center" mb={10}>
        <Avatar size={44} src={user?.avatar} />
        <Stack gap={0}>
          <Text fw={600}>{user?.name || ''}</Text>
          <Text c="dimmed" fz={10}>
            {t(roles.get(user?.roleId || '')?.name || '')}
          </Text>
        </Stack>
      </Flex>
      <DataRow title={t('Total')} content={formatDuration(total)} />
    </Stack>
  )
}

function DataRow({ title, content }: { title: string | ReactNode; content: string | ReactNode }) {
  return (
    <Flex w="100%" justify="space-between" align="center" gap={5} px={0} py={2}>
      <Text fw="bold" miw="40%" maw="50%">
        {title}
      </Text>
      <Flex ta="end">{content}</Flex>
    </Flex>
  )
}

function Wrapper({
  children,
  isShown,
  opened,
  onClick,
}: {
  children: ReactNode
  isShown: boolean
  opened: boolean
  onClick: (event: React.MouseEvent) => void
}) {
  if (!isShown) {
    return <></>
  }

  return (
    <Flex w="100%" direction={opened ? 'column-reverse' : 'column'}>
      <Group justify="center" w="100%" onClick={onClick}>
        <IconChevronDown
          size={18}
          stroke={2}
          style={{
            transform: opened ? 'rotate(180deg)' : 'none',
            transition: 'transform 300ms ease',
          }}
        />
      </Group>
      <Collapse transitionDuration={300} transitionTimingFunction="linear" in={opened}>
        <Box className={classes.container}>{children}</Box>
      </Collapse>
    </Flex>
  )
}

function AttendanceLogInformation({ attendanceLog }: { attendanceLog: AttendanceLog }) {
  const { venues } = useVenueStore()
  const t = useTranslation()

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
    <Stack className={classes.attendanceContainer}>
      <DataRow title={t('Date')} content={formatTime(attendanceLog.start, 'ddd DD/MM/YYYY')} />
      <DataRow title={t('Total')} content={formatDuration(total || 0) ?? '-'} />
      <DataRow title={t('Clock in')} content={formatTime(attendanceLog.start, 'HH:mm')} />
      <DataRow title={t('Clock out')} content={formatTime(attendanceLog.end, 'HH:mm')} />
      <DataRow title={t('Venue')} content={venues.get(attendanceLog.venueId)?.name} />
      <DataRow
        title={t('Attendance image')}
        content={
          <ActionIcon variant="transparent" onClick={onClick} size="sm">
            <IconCameraPin stroke={1.5} />
          </ActionIcon>
        }
      />
    </Stack>
  )
}
