import { AddUserRequest } from '@/services/domain'
import { UseFormReturnType } from '@mantine/form'
import BasicInformation from './components/BasicInformation'
import LeaveDays from './components/LeaveDays'
import RoleAndPermissions from './components/RoleAndPermissions'
import StaffInformation from './components/StaffInformation'
import WorkingMode from './components/WorkingMode'

export enum Tabs {
  BASIC_INFORMATION = 'Basic information',
  WORKING_MODE = 'Working mode',
  LEAVE_DAYS = 'Leave days',
  STAFF_INFORMATION = 'Staff information',
  ROLE_AND_PERMISSIONS = 'Role & permissions',
}

export const tabs = [
  { label: Tabs.BASIC_INFORMATION, content: BasicInformation },
  { label: Tabs.WORKING_MODE, content: WorkingMode },
  { label: Tabs.LEAVE_DAYS, content: LeaveDays },
  { label: Tabs.STAFF_INFORMATION, content: StaffInformation },
  { label: Tabs.ROLE_AND_PERMISSIONS, content: RoleAndPermissions },
]

export type AddStaffForm = {
  form: UseFormReturnType<AddUserRequest>
  onSubmit: (values: AddUserRequest) => void
}
