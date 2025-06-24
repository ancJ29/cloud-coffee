import { pushNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { resetPassword } from '@/services/domain'
import { NotificationType } from '@/types'
import { getPasswordSchema } from '@/utils'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import z from 'zod'
import ResetPasswordView from './components/ResetPasswordView'

export type FormProps = { newPassword: string; confirmPassword: string }

const initialValues: FormProps = {
  newPassword: '',
  confirmPassword: '',
}

export default function ResetPassword() {
  const t = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm<FormProps>({
    initialValues,
    validateInputOnBlur: true,
    validate: zodResolver(schema(t)),
  })

  const submit = useCallback(
    async (values: FormProps) => {
      if (!token) {
        pushNotification({
          type: NotificationType.ERROR,
          message: t('The reset link is invalid or has been modified'),
        })
        return
      }

      resetPassword({ token, newPassword: values.newPassword }).then((res) => {
        const success = res?.success
        if (success) {
          pushNotification({
            type: NotificationType.INFO,
            message: t('Password successfully changed. Please login.'),
          })
          navigate('/login')
        } else {
          pushNotification({
            type: NotificationType.ERROR,
            message: t('The reset link has expired'),
          })
        }
      })
    },
    [navigate, t, token],
  )

  return <ResetPasswordView form={form} onSubmit={submit} />
}

export const schema = (t: (key: string) => string) =>
  z
    .object({
      newPassword: getPasswordSchema(t),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('The passwords did not match'),
    })
