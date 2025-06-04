import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { UpdateUserRequest, User } from '@/services/domain'
import { OptionProps } from '@/types'
import { Button, Stack, Switch, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'

const w = '100%'

const initialValues: UpdateUserRequest = {
  id: '',
  name: '',
  email: '',
  roleId: '',
  salaryRuleId: '',
  clientId: '',
  baseSalary: 0,
  enabled: true,
  canSendEmail: true,
}

type EditUserFormProps = {
  user: User
  reOpen: (user: UpdateUserRequest) => void
  onConfirm: (user: UpdateUserRequest) => void
  roleOptions: OptionProps[]
  salaryRuleOptions: OptionProps[]
}

export default function EditUserForm({
  user,
  reOpen,
  onConfirm,
  roleOptions,
  salaryRuleOptions,
}: EditUserFormProps) {
  const t = useTranslation()
  const form = useForm<UpdateUserRequest>({
    initialValues: { ...initialValues, ...user, enabled: user.enabled || false },
    validate: _validate(t),
  })

  const onSubmit = (values: UpdateUserRequest) => {
    modals.openConfirmModal({
      title: t('Update user'),
      children: <Text size="sm">{t('Are you sure you want to update user?')}</Text>,
      labels: { confirm: t('Confirm'), cancel: t('Cancel') },
      onCancel: () => {
        modals.closeAll()
        reOpen(values)
      },
      onConfirm: () => {
        modals.closeAll()
        onConfirm({
          ...values,
          name: values.name.trim(),
          email: values.email?.trim() || undefined,
        })
      },
    })
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={10} px={10} align="center">
        <Switch
          checked={form.values.enabled}
          w={w}
          labelPosition="left"
          label={t('Status')}
          mt={4}
          {...form.getInputProps('enabled')}
        />
        <TextInput
          data-autofocus
          w={w}
          label={t('Name')}
          placeholder={t('Enter your fullname')}
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          w={w}
          label={t('Email')}
          placeholder="example@email.com"
          {...form.getInputProps('email')}
        />
        <Select
          w={w}
          label={t('Role')}
          options={roleOptions}
          withAsterisk
          {...form.getInputProps('roleId')}
        />
        <Select
          w={w}
          label={t('Salary rule')}
          options={salaryRuleOptions}
          withAsterisk
          {...form.getInputProps('salaryRuleId')}
        />
        <Button type="submit" mt={10}>
          {t('Update')}
        </Button>
      </Stack>
    </form>
  )
}

function _validate(t: (s: string) => string) {
  return {
    name: (value: string) => (value === '' ? t('Field is required') : null),
    email: (value?: string | null) => {
      if (!value || value.trim() === '') {
        return null
      }
      return /^\S+@\S+$/.test(value) ? null : t('Invalid email')
    },
    roleId: (value: string | null) => (value === '' || !value ? t('Field is required') : null),
    salaryRuleId: (value?: string | null) =>
      value === '' || !value ? t('Field is required') : null,
  }
}
