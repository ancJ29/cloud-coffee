import { NumberInput } from '@/components'
import { WEEKDAYS } from '@/configs/constant'
import useTranslation from '@/hooks/useTranslation'
import { ActionIcon, Grid, Stack, Text } from '@mantine/core'
import { IconCopy } from '@tabler/icons-react'

export default function OvertimeRatePerDay() {
  const t = useTranslation()

  return (
    <Stack gap={0}>
      <Text fw="bold" fz={16}>
        {t('Overtime rate per day')}
      </Text>
      {WEEKDAYS.map((day, idx) => (
        <Item key={idx} label={day} value={1.0} showCopyIcon={idx === 0} />
      ))}
    </Stack>
  )
}

type ItemProps = {
  label: string
  value: number
  showCopyIcon: boolean
}
function Item({ label, value, showCopyIcon }: ItemProps) {
  const t = useTranslation()

  return (
    <Grid gutter={0} align="end">
      <Grid.Col span={3.5}>
        <Text fz={16}>{t(label)}</Text>
      </Grid.Col>
      <Grid.Col span={7}>
        <NumberInput
          defaultValue={value}
          size="xs"
          decimalScale={2}
          allowNegative={false}
          fixedDecimalScale
        />
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
