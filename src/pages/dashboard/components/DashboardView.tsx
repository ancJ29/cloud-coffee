import { LiveClock } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'
import Item from './Item'

export default function DashboardView() {
  const t = useTranslation()

  return (
    <Stack align="center" justify="center" h="100%">
      <Stack gap={10} align="center" w="100%">
        <Text fw="bold" fz={16} mb={10}>
          {t(`What's news?`)}
        </Text>
        <Item
          title={t('Current Time')}
          content={
            <LiveClock format="HH:mm A" fz={36} c="var(--text-secondary)" lh="normal" fw="normal" />
          }
        />
        <Item title={t('Staffs Clocked in')} content="0" />
        <Item title={t('Staffs Clocked out')} content="0" />
        <Item title={t('Staffs on Leave Today')} content="0" />
        <Item title={t('Open Leave Request')} content="0" />
      </Stack>
    </Stack>
  )
}
