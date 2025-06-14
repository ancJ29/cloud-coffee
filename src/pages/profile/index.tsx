import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { updateUser, User } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import { useForm } from '@mantine/form'
import { useCallback, useMemo } from 'react'
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
    validate: _validate(t),
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
      }).then((res) => showNotification({ t, success: res?.success }))
    },
    [t],
  )

  return <ProfileForm form={form} onSubmit={submit} roleOptions={roleOptions} />
}

function _validate(t: (s: string) => string) {
  return {
    name: (value: string) => (value === '' ? t('Field is required') : null),
    email: (value?: string | null) => {
      if (!value || value.trim() === '') {
        return null
      }
      return /^\S+@\S+$/.test(value) ? null : t('Invalid email')
    },
    roleId: (value: string | null) => (value === '' || !value ? t('Field is required') : null),
  }
}
