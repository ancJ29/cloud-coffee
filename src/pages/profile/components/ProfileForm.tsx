import { Select, TextInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { OptionProps } from '@/types'
import { Anchor, Avatar, Button, Center, Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

type ProfileFormProps = {
  form: UseFormReturnType<User>
  onSubmit: (values: User) => void
  roleOptions: OptionProps[]
}

export default function ProfileForm({ form, onSubmit, roleOptions }: ProfileFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={35} w={{ base: '80%', sm: 400 }}>
        <Center>
          <Avatar size={120} src={form.values.avatar} />
        </Center>
        <TextInput withAsterisk label={t('Name')} data-autofocus {...form.getInputProps('name')} />
        <TextInput withAsterisk label={t('Email')} {...form.getInputProps('email')} />
        <Select
          withAsterisk
          label={t('Role')}
          options={roleOptions}
          disabled
          {...form.getInputProps('roleId')}
        />
        <Stack gap={20}>
          <Button type="submit" mt={10}>
            {t('Save')}
          </Button>
          <Anchor ta="center" href="/change-password">
            {t('Change password')}
          </Anchor>
        </Stack>
      </Stack>
    </form>
  )
}
