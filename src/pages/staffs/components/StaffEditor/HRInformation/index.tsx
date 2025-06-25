import { DateInput, PhoneInput, Select, TextInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Button, Group, Stack } from '@mantine/core'

export default function HRInformation() {
  const t = useTranslation()
  return (
    <Stack gap={20} w="100%">
      <Select label={t('Direct line manager')} options={[]} />
      <DateInput label={t('Join date')} />
      <DateInput label={t('End date')} />
      <DateInput label={t('Date of birth')} />
      <TextInput label={t('Employee address')} />
      <TextInput label={t('Personal contact email')} />
      <TextInput label={t('Emergency contact name')} />
      <PhoneInput label={t('Emergency contact phone number')} />
      <Select label={t('Contact type')} options={[]} />
      <TextInput label={t('Job title')} />
      <TextInput label={t('Internal staff ID')} />
      <Group justify="flex-end" mt={20}>
        <Button type="submit">{t('Save staff')}</Button>
      </Group>
    </Stack>
  )
}
