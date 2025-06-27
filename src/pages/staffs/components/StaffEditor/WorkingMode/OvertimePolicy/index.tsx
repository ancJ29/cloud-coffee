import { Collapse } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Checkbox, NumberInput, Stack } from '@mantine/core'
import { useState } from 'react'
import OvertimeRatePerDay from './OvertimeRatePerDay'

export default function OvertimePolicy() {
  const t = useTranslation()
  const [isEligibleForOvertime, setIsEligibleForOvertime] = useState(false)
  const [isSpecifyOvertimeRatesPerDay, setIsSpecifyOvertimeRatesPerDay] = useState(false)

  return (
    <>
      <Checkbox
        label={t('Eligible for overtime')}
        checked={isEligibleForOvertime}
        onChange={(e) => setIsEligibleForOvertime(e.target.checked)}
      />
      <Collapse in={isEligibleForOvertime}>
        <Stack gap={20} w="100%">
          <Collapse in={!isSpecifyOvertimeRatesPerDay}>
            <NumberInput
              withAsterisk
              label={t('Overtime rate multiplier')}
              defaultValue={1}
              decimalScale={2}
              allowNegative={false}
              fixedDecimalScale
            />
          </Collapse>
          <Checkbox
            label={t('Specify overtime rates per day')}
            checked={isSpecifyOvertimeRatesPerDay}
            onChange={(e) => setIsSpecifyOvertimeRatesPerDay(e.target.checked)}
          />
          <Collapse in={isSpecifyOvertimeRatesPerDay}>
            <OvertimeRatePerDay />
          </Collapse>
        </Stack>
      </Collapse>
    </>
  )
}
