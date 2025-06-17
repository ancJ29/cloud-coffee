import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { login, LoginRequest } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import { LoginState } from '@/types'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import LoginView from './components/LoginView'

const initialValues: LoginRequest = {
  email: '',
  password: '',
}

export default function Login() {
  const t = useTranslation()
  const { setToken } = useAuthStore()

  const form = useForm<LoginRequest>({
    initialValues,
    validateInputOnBlur: true,
    validate: zodResolver(schema(t)),
  })

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const state = location.state as LoginState
    if (state) {
      showNotification(state)
      navigate(location.pathname, { replace: true })
    }
  }, [location, navigate])

  const submit = useCallback(
    async (values: LoginRequest) => {
      const res = await login({
        ...values,
        email: values.email.trim(),
      })
      if (res?.token) {
        setToken(res.token)
      } else {
        form.setErrors({
          password: 'Email or password is incorrect',
        })
      }
    },
    [setToken, form],
  )

  return <LoginView form={form} onSubmit={submit} />
}

export const schema = (t: (key: string) => string) =>
  z.object({
    email: z.string().trim().min(1, t('Please enter email')),
    password: z.string().trim().min(1, t('Please enter password')),
  })
