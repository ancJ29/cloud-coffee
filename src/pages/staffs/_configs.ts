import { User } from '@/services/domain'
import { UseFormReturnType } from '@mantine/form'
import BasicInformation from './components/StaffEditor/BasicInformation'
import HRInformation from './components/StaffEditor/HRInformation'
import LeaveDays from './components/StaffEditor/LeaveDays'
import RoleAndPermissions from './components/StaffEditor/RoleAndPermissions'
import WorkingMode from './components/StaffEditor/WorkingMode'

export enum Tabs {
  BASIC_INFORMATION = 'Basic information',
  WORKING_MODE = 'Working mode',
  LEAVE_DAYS = 'Leave days',
  HR_INFORMATION = 'HR information',
  ROLE_AND_PERMISSIONS = 'Role & permissions',
}

export const tabs = [
  { label: Tabs.BASIC_INFORMATION, content: BasicInformation },
  { label: Tabs.WORKING_MODE, content: WorkingMode },
  { label: Tabs.LEAVE_DAYS, content: LeaveDays },
  { label: Tabs.HR_INFORMATION, content: HRInformation },
  { label: Tabs.ROLE_AND_PERMISSIONS, content: RoleAndPermissions },
]

export type UserFormProps = Omit<User, 'id' | 'clientId'> & {
  id?: string
  clientId?: string
}

export type UserForm = {
  form: UseFormReturnType<UserFormProps>
  onSubmit: (values: UserFormProps) => void
}
