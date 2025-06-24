import { Image } from '@mantine/core'
import LoginForm, { LoginFormProps } from './LoginForm'

export default function LoginView({ ...props }: LoginFormProps) {
  return (
    <>
      <Image src="/favicon.svg" w={250} />
      <LoginForm {...props} />
    </>
  )
}
