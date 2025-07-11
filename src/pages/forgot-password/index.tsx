import { pushNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { requestPasswordReset, RequestPasswordResetRequest } from '@/services/domain'
import { NotificationType } from '@/types'
import { getEmailSchema } from '@/utils'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import ForgotPasswordView from './components/ForgotPasswordView'

const initialValues: RequestPasswordResetRequest = {
  email: '',
}

export default function ForgotPassword() {
  const t = useTranslation()
  const navigate = useNavigate()
  const form = useForm<RequestPasswordResetRequest>({
    initialValues,
    validateInputOnBlur: true,
    validate: zodResolver(schema(t)),
  })

  const submit = useCallback(
    async (values: RequestPasswordResetRequest) => {
      requestPasswordReset({ email: values.email.trim() }).then((res) => {
        const success = res?.success
        if (success) {
          pushNotification({
            type: NotificationType.WARNING,
            message: t('Please check your email for instruction on how to reset your password'),
          })
          navigate('/login')
        } else {
          pushNotification({ type: NotificationType.ERROR, message: t('Email does not exist') })
        }
      })
    },
    [navigate, t],
  )

  return <ForgotPasswordView form={form} onSubmit={submit} />
}

const schema = (t: (key: string) => string) => z.object({ email: getEmailSchema(t) })
