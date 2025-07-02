import { Select, SelectProps } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import React, { useMemo } from 'react'

interface TimeSelectProps extends Omit<SelectProps, 'data'> {
  step?: number
}

function TimeSelectComponent({ step = 1, ...props }: TimeSelectProps) {
  const data = useMemo(
    () =>
      Array.from({ length: 24 * (60 / step) }, (_, index) => {
        const totalMinutes = index * step
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        return { value: time, label: time }
      }),
    [step],
  )

  return (
    <Select
      {...props}
      searchable
      data={data}
      checkIconPosition="right"
      rightSection={<IconChevronDown size={14} />}
      allowDeselect={false}
    />
  )
}

export const TimeSelect = React.memo(TimeSelectComponent)
