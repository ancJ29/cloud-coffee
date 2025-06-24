import { Stack } from '@mantine/core'
import Filter, { FilterProps } from '../Filter'
import ShiftSchedule from '../ShiftSchedule'

export default function TimesheetView({ ...props }: FilterProps) {
  return (
    <Stack gap={20}>
      <Filter {...props} />
      <ShiftSchedule />
    </Stack>
  )
}
