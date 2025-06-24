import useTranslation from '@/hooks/useTranslation'
import { login, LoginRequest } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useCallback } from 'react'
import z from 'zod'
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
          password: t('Email or password is incorrect'),
        })
      }
    },
    [form, setToken, t],
  )

  return <LoginView form={form} onSubmit={submit} />
}

const schema = (t: (key: string) => string) =>
  z.object({
    email: z.string().trim().min(1, t('Please enter email')),
    password: z.string().trim().min(1, t('Please enter password')),
  })
