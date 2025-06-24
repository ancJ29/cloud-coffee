import { PhoneInput, TextInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Button, Stack, Text } from '@mantine/core'
import { UserForm } from '../../../_configs'

export default function BasicInformation({ form, onSubmit }: UserForm) {
  const t = useTranslation()

  return (
    <Stack gap={10} w={{ base: '100%', sm: 400 }}>
      <Text fz={20} fw="bold">
        {t('Basic information')}
      </Text>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap={30} mt={25} w="100%">
          <TextInput label={t('Staff name')} withAsterisk {...form.getInputProps('name')} />
          <TextInput label={t('Email address')} {...form.getInputProps('email')} />
          <PhoneInput label={t('Phone number')} {...form.getInputProps('phone')} />
          <Button fullWidth type="submit">
            {t('Save staff')}
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
