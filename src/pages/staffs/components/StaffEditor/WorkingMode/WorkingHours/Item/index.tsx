import { TimeSelect } from '@/components'
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
    <Grid gutter={0} align="center">
      <Grid.Col span={4}>
        <Checkbox label={t(label)} defaultChecked />
      </Grid.Col>
      <Grid.Col span={3.5}>
        <TimeSelect defaultValue={startTime} />
      </Grid.Col>
      <Grid.Col span={3.5}>
        <TimeSelect defaultValue={endTime} ml={10} />
      </Grid.Col>
      <Grid.Col span={1}>
        {showCopyIcon && (
          <ActionIcon ml={10} variant="transparent">
            <IconCopy size={18} />
          </ActionIcon>
        )}
      </Grid.Col>
    </Grid>
  )
}
