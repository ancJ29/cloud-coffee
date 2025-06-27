import { Collapse, NumberInput, Select } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Button, Checkbox, Group, Stack } from '@mantine/core'
import { useState } from 'react'
import BookableLeaveDays from './BookableLeaveDays'
import DayBreak from './DayBreak'
import OvertimePolicy from './OvertimePolicy'
import WorkingHours from './WorkingHours'

export default function WorkingMode() {
  const t = useTranslation()
  const [isWorksShifts, setIsWorksShifts] = useState(false)

  return (
    <Stack gap={20} w="100%">
      <Select label={t('Use this working pattern')} options={[]} />
      <NumberInput label={t('Weekly contracted hours')} defaultValue={0} />
      <NumberInput
        label={t('Hourly rate')}
        defaultValue={0}
        hint={t('How much does this staff get paid per hour?')}
      />
      <OvertimePolicy />
      <Collapse in={!isWorksShifts}>
        <WorkingHours />
      </Collapse>
      <Checkbox
        label={t('Works shifts')}
        checked={isWorksShifts}
        onChange={(e) => setIsWorksShifts(e.target.checked)}
      />
      <BookableLeaveDays isWorksShifts={isWorksShifts} />
      <DayBreak isWorksShifts={isWorksShifts} />

      <Group justify="flex-end" mt={10}>
        <Button>{t('Save staff')}</Button>
      </Group>
    </Stack>
  )
}
