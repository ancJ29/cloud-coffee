import { UpdateUserRequest } from '@/services/domain'
import { UseFormReturnType } from '@mantine/form'
import { Tabs } from '../_configs'
import BasicInformation from './components/BasicInformation'
import LeaveDays from './components/LeaveDays'
import RoleAndPermissions from './components/RoleAndPermissions'
import StaffInformation from './components/StaffInformation'
import WorkingMode from './components/WorkingMode'

export const tabs = [
  { label: Tabs.BASIC_INFORMATION, content: BasicInformation },
  { label: Tabs.WORKING_MODE, content: WorkingMode },
  { label: Tabs.LEAVE_DAYS, content: LeaveDays },
  { label: Tabs.STAFF_INFORMATION, content: StaffInformation },
  { label: Tabs.ROLE_AND_PERMISSIONS, content: RoleAndPermissions },
]

export type UpdateStaffForm = {
  form: UseFormReturnType<UpdateUserRequest>
  onSubmit: (values: UpdateUserRequest) => void
}
