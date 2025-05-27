import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { AddUserRequest } from '@/services/domain'
import { OptionProps } from '@/types'
import { randomPassword } from '@/utils'
import {
  ActionIcon,
  Box,
  Button,
  CopyButton,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { IconCheck, IconCopy } from '@tabler/icons-react'

const w = '100%'

const initialValues: AddUserRequest = {
  username: '',
  name: '',
  email: '',
  password: '',
  roleId: '',
  salaryRuleId: '',
  baseSalary: 0,
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
      password: randomPassword(),
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
          email: values.email?.trim(),
          username: values.username.trim(),
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
          label={t('Username')}
          placeholder={t('Username')}
          withAsterisk
          {...form.getInputProps('username')}
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
        <Box w={w}>
          <Flex w={w} align="end" justify="between" gap={5}>
            <PasswordInput
              w={w}
              disabled
              visible
              label={t('Password')}
              placeholder={t('Password')}
              {...form.getInputProps('password')}
            />
            <CopyButton value={form.values.password} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    variant="subtle"
                    onClick={copy}
                    mb={4}
                  >
                    {copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Flex>
          <Text ta="left" fz={12} c="var(--error)" mt={2}>
            {t('Please copy and keep password safe before create new user')}
          </Text>
        </Box>
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
    username: (value: string) => (value === '' ? t('Field is required') : null),
    email: (value?: string | null) => {
      if (!value || value.trim() === '') {
        return null
      }
      return /^\S+@\S+$/.test(value) ? null : t('Invalid email')
    },
    password: (value: string) => (value === '' ? t('Field is required') : null),
    salaryRuleId: (value?: string | null) =>
      value === '' || !value ? t('Field is required') : null,
    roleId: (value: string | null) => (value === '' || !value ? t('Field is required') : null),
  }
}
