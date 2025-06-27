import { DateInput, NumberInput, Select } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { startOfYear } from '@/utils'
import { Button, Checkbox, Group, Stack } from '@mantine/core'

export default function LeaveDays() {
  const t = useTranslation()
  return (
    <Stack gap={20} w="100%">
      <NumberInput label={t('Leave entitlement')} withAsterisk defaultValue={0} />
      <NumberInput label={t('Remaining leave')} disabled defaultValue={0} />
      <DateInput
        label={t('Leave year starts on')}
        defaultValue={new Date(startOfYear(Date.now())).toDateString()}
        hint={t('Annual leave will start on this date')}
      />
      <Checkbox label={t('Accrues leave?')} />
      <NumberInput label={t('Carry over days into next leave year')} defaultValue={0} />
      <Select label={t('Time off in lieu')} options={[]} />
      <Group justify="flex-end" mt={10}>
        <Button>{t('Save staff')}</Button>
      </Group>
    </Stack>
  )
}
