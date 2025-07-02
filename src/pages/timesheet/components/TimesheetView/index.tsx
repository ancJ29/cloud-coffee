import { Stack } from '@mantine/core'
import AttendanceSchedule from '../AttendanceSchedule'
import Filter, { FilterProps } from '../Filter'

export default function TimesheetView({ ...props }: FilterProps) {
  return (
    <Stack gap={20}>
      <Filter {...props} />
      <AttendanceSchedule />
    </Stack>
  )
}
