import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { login } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import { useForm } from '@mantine/form'
import { useCallback } from 'react'
import LoginView from './components/LoginView'

export type FormProps = {
  email: string
  password: string
  remember: boolean
}

const initialValues: FormProps = {
  email: '',
  password: '',
  remember: localStorage.__REMEMBER__ === 'true',
}

export default function Login() {
  const t = useTranslation()
  const { setToken } = useAuthStore()

  const form = useForm<FormProps>({
    initialValues,
    validate: _validate(t),
  })

  useMount(() => form.setFieldValue('remember', localStorage.__REMEMBER__ === 'true'))

  const submit = useCallback(
    async (values: FormProps) => {
      const res = await login(values)
      if (res?.token) {
        setToken(res.token, form.values.remember)
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

function _validate(t: (s: string) => string) {
  return {
    email: (value: string) => (value === '' ? t('Please enter email') : null),
    password: (value: string) => (value === '' ? t('Please enter password') : null),
  }
}
