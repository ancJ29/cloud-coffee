import { pushNotification } from '@/configs/notifications'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { updateUser } from '@/services/domain'
import useUserStore from '@/stores/user.store'
import { NotificationType } from '@/types'
import { getEmailSchema, getPhoneSchema } from '@/utils'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import z from 'zod'
import { UserFormProps } from '../_configs'
import EditStaffView from './components/EditStaffView'

export default function EditStaff() {
  const t = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { users, load } = useUserStore()

  const form = useForm<UserFormProps>({
    validate: zodResolver(schema(t)),
    validateInputOnBlur: true,
  })

  const getData = useCallback(() => {
    if (!id) {
      return
    }
    const user = users.get(id)
    user && form.setValues({ ...user })
  }, [form, id, users])
  useMount(getData)

  const handleSubmit = useCallback(
    (values: UserFormProps) => {
      updateUser({
        ...values,
        id: id || '',
        clientId: values.clientId || '',
        name: values.name.trim(),
        email: values.email?.trim(),
        enabled: true,
      }).then((res) => {
        const success = res?.success
        pushNotification({ t, type: success ? NotificationType.INFO : NotificationType.ERROR })
        load(true)
      })
    },
    [id, load, t],
  )

  if (!id) {
    navigate('/staffs')
  }

  return <EditStaffView form={form} onSubmit={handleSubmit} />
}

export const schema = (t: (key: string) => string) =>
  z.object({
    name: z.string().trim().min(1, t('Please enter staff name')),
    email: getEmailSchema(t, { required: false }),
    phone: getPhoneSchema(t, { required: false }),
  })
