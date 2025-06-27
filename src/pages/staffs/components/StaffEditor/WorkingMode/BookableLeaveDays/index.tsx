import { NumberInput } from '@/components'
import { WEEKDAYS } from '@/configs/constant'
import useTranslation from '@/hooks/useTranslation'
import { Checkbox, Group, Stack, Text } from '@mantine/core'

type BookableLeaveDaysProps = {
  isWorksShifts: boolean
}

export default function BookableLeaveDays({ isWorksShifts }: BookableLeaveDaysProps) {
  const t = useTranslation()

  const weekDays = WEEKDAYS.map((day, idx) => ({ label: t(day), value: idx }))

  return (
    <Stack gap={0}>
      <Text fw="bold" fz={16}>
        {t('Bookable leave days')}
      </Text>
      {!isWorksShifts ? (
        <Text>
          {t(
            'Based on your working schedule set, this staff can book leave on Monday, Tuesday, Wednesday, Thursday, Friday',
          )}
        </Text>
      ) : (
        <Stack gap={20}>
          <Checkbox.Group defaultValue={[]}>
            <Group mt="xs">
              {weekDays.map((day) => (
                <Checkbox key={day.value} value={day.value} label={day.label} />
              ))}
            </Group>
          </Checkbox.Group>
          <NumberInput label={t('How many hours does 1 leave day equate to?')} defaultValue={8} />
        </Stack>
      )}
    </Stack>
  )
}
