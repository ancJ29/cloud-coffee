import { Image } from '@mantine/core'
import ResetPasswordForm, { ResetPasswordFormProps } from './ResetPasswordForm'

export default function ResetPasswordView({ ...props }: ResetPasswordFormProps) {
  return (
    <>
      <Image src="/logo.svg" w={250} />
      <ResetPasswordForm {...props} />
    </>
  )
}
