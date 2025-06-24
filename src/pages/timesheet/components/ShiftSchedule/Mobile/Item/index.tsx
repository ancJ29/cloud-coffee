import { Avatar } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { SalaryRule, Shift, User } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import useVenueStore from '@/stores/venue.store'
import { calculateSalary, formatDuration, formatNumber, formatTime, ONE_HOUR } from '@/utils'
import { ActionIcon, Box, Card, Collapse, Flex, Group, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconCameraPin, IconChevronDown } from '@tabler/icons-react'
import { ReactNode, useCallback, useMemo } from 'react'
import ShiftImage from '../../ShiftImage'
import classes from './index.module.scss'

type ItemProps = {
  user?: User
  shifts: Shift[]
}

export default function Item({ user, shifts }: ItemProps) {
  const [opened, { toggle }] = useDisclosure(false)
  const { salaryRules } = useSalaryRuleStore()
  const salaryRule = salaryRules.get(user?.salaryRuleId || '')

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      toggle()
    },
    [toggle],
  )

  const total = useMemo(() => {
    const totalMilliseconds = shifts.some((shift) => shift.end != null)
      ? shifts.reduce((acc, shift) => {
          if (shift.end == null) {
            return acc
          }

          let duration = shift.end - shift.start
          if (shift.end < shift.start) {
            duration += 24 * ONE_HOUR
          }

          return acc + duration
        }, 0)
      : null

    return totalMilliseconds
  }, [shifts])

  if (!user) {
    return <></>
  }

  return (
    <Card shadow="md" withBorder p={12} radius={8}>
      <UserInformation user={user} total={total} salaryRule={salaryRule} onClick={handleClick} />
      <Wrapper isShown={shifts.length > 0} opened={opened} onClick={handleClick}>
        {shifts.map((shift) => (
          <ShiftInformation key={shift.id} shift={shift} salaryRule={salaryRule} />
        ))}
      </Wrapper>
    </Card>
  )
}

function UserInformation({
  user,
  total,
  salaryRule,
  onClick,
}: {
  user: User
  total: number | null
  salaryRule?: SalaryRule
  onClick: (event: React.MouseEvent) => void
}) {
  const { roles } = useRoleStore()
  const t = useTranslation()

  const expectedSalary = formatNumber(calculateSalary(total || 0, salaryRule))

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
      <DataRow title={`${t('Expected salary')}`} content={`${expectedSalary} VND`} />
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

function ShiftInformation({ shift, salaryRule }: { shift: Shift; salaryRule?: SalaryRule }) {
  const { venues } = useVenueStore()
  const t = useTranslation()

  const total = useMemo(() => {
    if (!shift.end) {
      return
    }
    let totalMilliseconds = shift.end - shift.start
    if (shift.end < shift.start) {
      totalMilliseconds += 24 * ONE_HOUR
    }
    return totalMilliseconds
  }, [shift])
  const expectedSalary = formatNumber(calculateSalary(total || 0, salaryRule))

  const onClick = useCallback(() => {
    modals.open({
      withCloseButton: false,
      centered: true,
      size: 'xl',
      children: <ShiftImage shift={shift} />,
    })
  }, [shift])

  return (
    <Stack className={classes.shiftContainer}>
      <DataRow title={t('Date')} content={formatTime(shift.start, 'ddd DD/MM/YYYY')} />
      <DataRow title={t('Total')} content={formatDuration(total || 0) ?? '-'} />
      <DataRow title={`${t('Expected salary')}`} content={`${expectedSalary} VND`} />
      <DataRow title={t('Clock in')} content={formatTime(shift.start, 'HH:mm')} />
      <DataRow title={t('Clock out')} content={formatTime(shift.end, 'HH:mm')} />
      <DataRow title={t('Venue')} content={venues.get(shift.venueId)?.name} />
      <DataRow
        title={t('Shift image')}
        content={
          <ActionIcon variant="transparent" onClick={onClick} size="sm">
            <IconCameraPin stroke={1.5} />
          </ActionIcon>
        }
      />
    </Stack>
  )
}
