import Avatar from '@/components/common/Avatar'
import useTranslation from '@/hooks/useTranslation'
import { SalaryRule, Shift, User } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import useVenueStore from '@/stores/venue.store'
import {
  calculateSalary,
  formatDuration,
  formatNumber,
  formatTime,
  ONE_HOUR,
  unique,
} from '@/utils'
import { Accordion, ActionIcon, Flex, Grid, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconCaptureFilled, IconChevronRight } from '@tabler/icons-react'
import { useCallback, useMemo, useState } from 'react'
import store from '../../../../_shift.store'
import ShiftImage from '../../ShiftImage'
import TimeSelect from '../TimeSelect'
import classes from './Item.module.scss'

type ItemProps = {
  user?: User
  shifts: Shift[]
}

export default function Item({ user, shifts }: ItemProps) {
  const [opened, setOpened] = useState(true)
  const { salaryRules } = useSalaryRuleStore()
  const salaryRule = salaryRules.get(user?.salaryRuleId || '')

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
        <Accordion.Control onClick={() => setOpened(!opened)} bg="var(--shift-accordion-bg)">
          <UserInformation
            user={user}
            total={total}
            opened={opened}
            shifts={shifts}
            salaryRule={salaryRule}
          />
        </Accordion.Control>
        <Accordion.Panel>
          {shifts.map((shift) => (
            <ShiftInformation key={shift.id} shift={shift} salaryRule={salaryRule} />
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
  shifts,
  salaryRule,
}: {
  user: User
  total: number | null
  opened: boolean
  shifts: Shift[]
  salaryRule?: SalaryRule
}) {
  const t = useTranslation()
  const { roles } = useRoleStore()
  const { venues } = useVenueStore()

  const _venues = useMemo(() => {
    return unique(shifts.map((e) => venues.get(e.venueId)?.name))
      .filter(Boolean)
      .join(', ')
  }, [shifts, venues])

  const expectedSalary = formatNumber(calculateSalary(total || 0, salaryRule))

  return (
    <Grid>
      <Grid.Col span={2.25} className={classes.nameItem}>
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
      <Grid.Col span={1.75} className={classes.infoItem}>
        {formatDuration(total)}
      </Grid.Col>
      <Grid.Col span={1.75} className={classes.infoItem}>
        {expectedSalary}
      </Grid.Col>
      <Grid.Col span={1.75} className={classes.infoItem}>
        -
      </Grid.Col>
      <Grid.Col span={1.75} className={classes.infoItem}>
        -
      </Grid.Col>
      <Grid.Col span={2.25} className={classes.infoItem}>
        <Text className={classes.venueText}>{_venues}</Text>
      </Grid.Col>
    </Grid>
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
      title: t('Shift image'),
      centered: true,
      size: 'lg',
      children: <ShiftImage shift={shift} />,
    })
  }, [shift, t])

  return (
    <Grid className={classes.shiftContainer}>
      <Grid.Col span={2.25} className={classes.dateItem}>
        <Text w={32} c="dimmed">
          {formatTime(shift.start, 'ddd')}
        </Text>
        {formatTime(shift.start, 'DD/MM')}
      </Grid.Col>
      <Grid.Col span={1.75} className={classes.shiftItem}>
        {formatDuration(total || 0) ?? '-'}
      </Grid.Col>
      <Grid.Col span={1.75} className={classes.shiftItem}>
        {expectedSalary}
      </Grid.Col>
      <Grid.Col span={1.75} className={classes.timeItem}>
        <TimeSelect
          value={shift.start}
          onChangeValue={(value) => store.changeCheckInTime(shift.userId, shift.id, value)}
        />
      </Grid.Col>
      <Grid.Col span={1.75} className={classes.timeItem}>
        <TimeSelect
          value={shift.end}
          onChangeValue={(value) => store.changeCheckOutTime(shift.userId, shift.id, value)}
        />
      </Grid.Col>
      <Grid.Col span={2.25} className={classes.shiftItem}>
        <Text className={classes.venueText}>{venues.get(shift.venueId)?.name || '-'}</Text>
      </Grid.Col>
      <Grid.Col span={0.5} className={classes.shiftItem}>
        <ActionIcon variant="transparent" onClick={onClick}>
          <IconCaptureFilled stroke={1} />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  )
}
