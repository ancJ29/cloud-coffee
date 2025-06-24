import { User } from '@/services/domain'
import { UseFormReturnType } from '@mantine/form'
import BasicInformation from './components/StaffEditor/BasicInformation'
import LeaveDays from './components/StaffEditor/LeaveDays'
import RoleAndPermissions from './components/StaffEditor/RoleAndPermissions'
import StaffInformation from './components/StaffEditor/StaffInformation'
import WorkingMode from './components/StaffEditor/WorkingMode'

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

export type UserFormProps = Omit<User, 'id' | 'clientId'> & {
  id?: string
  clientId?: string
}

export type UserForm = {
  form: UseFormReturnType<UserFormProps>
  onSubmit: (values: UserFormProps) => void
}
