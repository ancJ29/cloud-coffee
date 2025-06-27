import { TimeInput } from '@/components'
import { Checkbox, Grid, Group, Image, NumberInput } from '@mantine/core'

type ItemProps = {
  onRemove: () => void
  weekDays: { label: string; value: number }[]
}

export default function Item({ weekDays, onRemove }: ItemProps) {
  return (
    <Grid gutter={0} align="end">
      <Grid.Col span={2}>
        <TimeInput defaultValue="09:00" size="xs" />
      </Grid.Col>
      <Grid.Col span={2}>
        <NumberInput
          defaultValue={0}
          size="xs"
          allowNegative={false}
          allowDecimal={false}
          ml={10}
        />
      </Grid.Col>
      <Grid.Col span={2}>
        <NumberInput
          defaultValue={0}
          size="xs"
          allowNegative={false}
          allowDecimal={false}
          ml={10}
        />
      </Grid.Col>
      <Grid.Col span={5}>
        <Checkbox.Group defaultValue={[]}>
          <Group ml={10}>
            {weekDays.map((day) => (
              <Checkbox key={day.value} label={day.label} />
            ))}
          </Group>
        </Checkbox.Group>
      </Grid.Col>
      <Grid.Col span={1}>
        <Image src="/imgs/staff/delete.svg" w={16} onClick={onRemove} ml={10} mb={4} />
      </Grid.Col>
    </Grid>
  )
}
