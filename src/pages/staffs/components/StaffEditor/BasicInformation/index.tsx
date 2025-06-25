import { CopyInput, PhoneInput, TextInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'
import { UserForm } from '../../../_configs'

export default function BasicInformation({ form, onSubmit }: UserForm) {
  const t = useTranslation()
  const url = `${window.location.origin}/time-clock?id=${form.values.id}`

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={20} w="100%">
        <TextInput label={t('Staff name')} withAsterisk {...form.getInputProps('name')} />
        <TextInput label={t('Email address')} {...form.getInputProps('email')} />
        <PhoneInput label={t('Phone number')} {...form.getInputProps('phone')} />
        {form.values.id && <CopyInput label="URL" value={url} />}
        <Button fullWidth type="submit" mt={10}>
          {t('Save staff')}
        </Button>
      </Stack>
    </form>
  )
}
