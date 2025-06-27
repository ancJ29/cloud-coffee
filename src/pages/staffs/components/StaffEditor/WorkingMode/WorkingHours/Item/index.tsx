import { TimeInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { ActionIcon, Checkbox, Grid } from '@mantine/core'
import { IconCopy } from '@tabler/icons-react'

type ItemProps = {
  label: string
  startTime: string
  endTime: string
  showCopyIcon: boolean
}
export default function Item({ label, startTime, endTime, showCopyIcon }: ItemProps) {
  const t = useTranslation()

  return (
    <Grid gutter={0} align="end">
      <Grid.Col span={3.5}>
        <Checkbox label={t(label)} defaultChecked />
      </Grid.Col>
      <Grid.Col span={3.5}>
        <TimeInput defaultValue={startTime} size="xs" />
      </Grid.Col>
      <Grid.Col span={3.5}>
        <TimeInput defaultValue={endTime} size="xs" ml={10} />
      </Grid.Col>
      <Grid.Col span={1.5}>
        {showCopyIcon && (
          <ActionIcon ml={15} variant="transparent">
            <IconCopy size={18} />
          </ActionIcon>
        )}
      </Grid.Col>
    </Grid>
  )
}
