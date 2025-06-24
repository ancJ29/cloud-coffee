import { pushNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { updateUser, User } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import { NotificationType } from '@/types'
import { getEmailSchema } from '@/utils'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback, useMemo } from 'react'
import z from 'zod'
import ProfileForm from './components/ProfileForm'

export default function Profile() {
  const t = useTranslation()
  const { user } = useAuthStore()
  const { roles } = useRoleStore()
  const form = useForm<User>({
    initialValues: user
      ? {
          ...user,
          clientId: user?.client.id || '',
        }
      : undefined,
    validate: zodResolver(schema(t)),
  })

  const roleOptions = useMemo(
    () =>
      Array.from(roles.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [roles, t],
  )

  const submit = useCallback(
    (values: User) => {
      updateUser({
        ...values,
        name: values.name.trim(),
        email: values.email?.trim(),
        enabled: true,
      }).then((res) =>
        pushNotification({
          t,
          type: res?.success ? NotificationType.INFO : NotificationType.ERROR,
        }),
      )
    },
    [t],
  )

  return <ProfileForm form={form} onSubmit={submit} roleOptions={roleOptions} />
}

export const schema = (t: (key: string) => string) =>
  z.object({
    name: z.string().trim().min(1, t('Please enter name')),
    email: getEmailSchema(t),
    roleId: z.string().trim().min(1, t('Please select role')),
  })
