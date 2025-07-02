import useTranslation from '@/hooks/useTranslation'
import { UserForm } from '../../_configs'
import StaffEditor from '../../components/StaffEditor'

export default function AddStaffView({ ...props }: UserForm) {
  const t = useTranslation()
  return <StaffEditor title={`${t('Add staff')} - ${props.form.values.name}`} {...props} />
}
