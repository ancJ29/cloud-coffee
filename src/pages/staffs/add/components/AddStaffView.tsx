import { UserForm } from '../../_configs'
import StaffEditor from '../../components/StaffEditor'

export default function AddStaffView({ ...props }: UserForm) {
  return <StaffEditor title="Add staff" {...props} />
}
