import { PhoneInput, TextInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'
import { AddStaffForm } from '../../../_configs'

export default function BasicInformationForm({ form, onSubmit }: AddStaffForm) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={30} mt={25} w="100%">
        <TextInput label={t('Staff name')} withAsterisk {...form.getInputProps('name')} />
        <TextInput label={t('Email address')} {...form.getInputProps('email')} />
        <PhoneInput label={t('Phone number')} {...form.getInputProps('phone')} />
        <Button fullWidth type="submit" className="btn-small-radius">
          {t('Save staff')}
        </Button>
      </Stack>
    </form>
  )
}
