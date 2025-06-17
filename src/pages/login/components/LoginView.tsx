import { Image } from '@mantine/core'
import LoginForm, { LoginFormProps } from './LoginForm'

export default function LoginView({ ...props }: LoginFormProps) {
  return (
    <>
      <Image src="/logo.svg" w={250} />
      <LoginForm {...props} />
    </>
  )
}
