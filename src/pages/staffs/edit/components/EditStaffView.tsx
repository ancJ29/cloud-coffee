import { UserForm } from '../../_configs'
import StaffEditor from '../../components/StaffEditor'

export default function EditStaffView({ ...props }: UserForm) {
  return <StaffEditor title="Update staff" {...props} />
}
