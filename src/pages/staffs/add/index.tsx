import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { AddUserRequest, addUser } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useUserStore from '@/stores/user.store'
import { ClientRoles } from '@/types'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback } from 'react'
import AddStaffView, { schema } from './components/AddStaffView'

const initialValues: AddUserRequest = {
  name: '',
  roleId: '',
}

export default function AddStaff() {
  const t = useTranslation()
  const { load } = useUserStore()
  const { roles } = useRoleStore()
  const form = useForm<AddUserRequest>({
    initialValues,
    validate: zodResolver(schema(t)),
    validateInputOnBlur: true,
  })

  const handleSubmit = useCallback(
    (values: AddUserRequest) => {
      addUser({
        ...values,
        roleId:
          Array.from(roles.values()).find((role) => role.name === ClientRoles.STAFF)?.id || '',
      }).then((res) => {
        const success = res?.success
        showNotification({ t, type: success ? 'info' : 'error' })
        load(true)
      })
    },
    [load, roles, t],
  )

  return <AddStaffView form={form} onSubmit={handleSubmit} />
}
