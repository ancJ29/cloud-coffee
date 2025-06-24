import { pushNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { changePassword } from '@/services/domain'
import { NotificationType } from '@/types'
import { getPasswordSchema, ONE_SECOND } from '@/utils'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import ChangePasswordView from './components/ChangePasswordView'

export type FormProps = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const initialValues: FormProps = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export default function ChangePassword() {
  const t = useTranslation()
  const navigate = useNavigate()
  const form = useForm<FormProps>({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: zodResolver(schema(t)),
  })

  const submit = useCallback(
    (values: FormProps) => {
      changePassword(values).then((res) => {
        const success = res?.success
        pushNotification({ t, type: success ? NotificationType.INFO : NotificationType.ERROR })
        success && setTimeout(() => navigate('/profile'), 2 * ONE_SECOND)
      })
    },
    [navigate, t],
  )

  return <ChangePasswordView form={form} onSubmit={submit} />
}

export const schema = (t: (key: string) => string) =>
  z
    .object({
      currentPassword: z.string().trim().min(1, t('Please enter current password')),
      newPassword: getPasswordSchema(t),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('The passwords did not match'),
    })
