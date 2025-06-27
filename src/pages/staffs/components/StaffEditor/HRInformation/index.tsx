import { DateInput, PhoneInput, TextInput } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Stack } from '@mantine/core'
import SaveStaffButton from '../SaveStaffButton'

export default function HRInformation() {
  const t = useTranslation()

  return (
    <Stack gap={20} w="100%">
      {/* <Select label={t('Direct line manager')} options={[]} /> */}
      <DateInput label={t('Join date')} />
      <DateInput label={t('End date')} />
      <DateInput label={t('Date of birth')} />
      <TextInput label={t('Staff address')} />
      <TextInput label={t('Personal contact email')} />
      <TextInput label={t('Emergency contact name')} />
      <PhoneInput label={t('Emergency contact phone number')} />
      {/* <Select label={t('Contact type')} options={[]} /> */}
      <TextInput label={t('Job title')} />
      <TextInput label={t('Internal staff ID')} />
      <SaveStaffButton />
    </Stack>
  )
}
