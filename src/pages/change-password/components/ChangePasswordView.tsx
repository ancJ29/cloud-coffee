import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'
import ChangePasswordForm, { ChangePasswordFormProps } from './ChangePasswordForm'

export default function ChangePasswordView({ ...props }: ChangePasswordFormProps) {
  const t = useTranslation()

  return (
    <Stack gap={10} mt={10}>
      <Text fz={24} fw="bold" ta="center">
        {t('Change password')}
      </Text>
      <ChangePasswordForm {...props} />
    </Stack>
  )
}
