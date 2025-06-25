import useTranslation from '@/hooks/useTranslation'
import { UserForm } from '../../_configs'
import StaffEditor from '../../components/StaffEditor'

export default function EditStaffView({ ...props }: UserForm) {
  const t = useTranslation()

  return <StaffEditor title={`${t('Update staff')} - ${props.form.values.name}`} {...props} />
}
