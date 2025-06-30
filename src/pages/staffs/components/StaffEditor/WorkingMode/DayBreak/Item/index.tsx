import { TimeSelect } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import useWindowResize from '@/hooks/useWindowResize'
import { Checkbox, Grid, Group, Image, NumberInput, Text } from '@mantine/core'

type ItemProps = {
  onRemove: () => void
  weekDays: { label: string; value: string }[]
}

export default function Item({ weekDays, onRemove }: ItemProps) {
  const t = useTranslation()
  const isMobile = useWindowResize()

  return (
    <Grid gutter={0} align="center" mb={20}>
      <Grid.Col span={{ base: 5, sm: 2 }}>
        <TimeSelect defaultValue="09:00" step={5} />
      </Grid.Col>
      <Grid.Col span={{ base: 3.5, sm: 2 }}>
        <NumberInput defaultValue={0} allowNegative={false} allowDecimal={false} ml={10} />
      </Grid.Col>
      <Grid.Col span={{ base: 3.5, sm: 2 }}>
        <NumberInput defaultValue={0} allowNegative={false} allowDecimal={false} ml={10} />
      </Grid.Col>
      <Grid.Col span={{ base: 11, sm: 5 }} mt={{ base: 20, sm: 0 }}>
        <Checkbox.Group
          defaultValue={[]}
          ml={{ base: 0, sm: 15 }}
          label={
            isMobile ? (
              <Text fz={16} mb={6}>
                <strong>{t("Don't")}</strong> {t('apply break on these days')}
              </Text>
            ) : (
              ''
            )
          }
        >
          <Group>
            {weekDays.map((day) => (
              <Checkbox key={day.value} label={day.label} />
            ))}
          </Group>
        </Checkbox.Group>
      </Grid.Col>
      <Grid.Col span={1} mt={{ base: 38, sm: 0 }}>
        <Image
          src="/imgs/staff/delete.svg"
          w={16}
          onClick={onRemove}
          ml={10}
          mb={4}
          style={{ cursor: 'pointer' }}
        />
      </Grid.Col>
    </Grid>
  )
}
