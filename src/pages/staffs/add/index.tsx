import { pushNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { addUser } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useUserStore from '@/stores/user.store'
import { ClientRoles, NotificationType } from '@/types'
import { getEmailSchema, getPhoneSchema, ONE_SECOND } from '@/utils'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import z from 'zod'
import { UserFormProps } from '../_configs'
import AddStaffView from './components/AddStaffView'

const initialValues: UserFormProps = {
  name: '',
  roleId: '',
  publicId: uuidv4(),
  memo: {},
}

export default function AddStaff() {
  const t = useTranslation()
  const navigate = useNavigate()
  const { load } = useUserStore()
  const { roles } = useRoleStore()

  const form = useForm<UserFormProps>({
    initialValues,
    validate: zodResolver(schema(t)),
    validateInputOnBlur: true,
  })

  const handleSubmit = useCallback(
    (values: UserFormProps) => {
      addUser({
        name: values.name.trim(),
        email: values.email?.trim(),
        publicId: values.publicId,
        roleId:
          Array.from(roles.values()).find((role) => role.name === ClientRoles.STAFF)?.id || '',
      }).then((res) => {
        const success = res?.success
        pushNotification({ t, type: success ? NotificationType.INFO : NotificationType.ERROR })
        load(true)
        success && setTimeout(() => navigate('/staffs'), 2 * ONE_SECOND)
      })
    },
    [load, navigate, roles, t],
  )

  return <AddStaffView form={form} onSubmit={handleSubmit} />
}

const schema = (t: (key: string) => string) =>
  z.object({
    name: z.string().trim().min(1, t('Please enter staff name')),
    email: getEmailSchema(t, { required: false }),
    phone: getPhoneSchema(t, { required: false }),
  })
