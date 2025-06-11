import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { AddUserRequest } from '@/services/domain'
import { OptionProps } from '@/types'
import { Button, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'

const w = '100%'

const initialValues: AddUserRequest = {
  name: '',
  email: '',
  roleId: '',
  salaryRuleId: '',
  canSendEmail: true,
}

type AddUserFormProps = {
  initValues?: AddUserRequest
  reOpen: (values: AddUserRequest) => void
  onConfirm: (values: AddUserRequest) => void
  roleOptions: OptionProps[]
  salaryRuleOptions: OptionProps[]
}

export default function AddUserForm({
  initValues,
  reOpen,
  onConfirm,
  roleOptions,
  salaryRuleOptions,
}: AddUserFormProps) {
  const t = useTranslation()
  const form = useForm<AddUserRequest>({
    initialValues: initValues ?? {
      ...initialValues,
    },
    validate: _validate(t),
  })

  const onSubmit = (values: AddUserRequest) => {
    modals.openConfirmModal({
      title: t('Add user'),
      children: <Text size="sm">{t('Are you sure you want to add new user?')}</Text>,
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
          {t('Add')}
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
    salaryRuleId: (value?: string | null) =>
      value === '' || !value ? t('Field is required') : null,
    roleId: (value: string | null) => (value === '' || !value ? t('Field is required') : null),
  }
}
