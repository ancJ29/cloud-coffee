import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'
import { AddStaffForm } from '../../_configs'
import AddFormStaff from './BasicInformationForm'

export default function BasicInformation({ ...props }: AddStaffForm) {
  const t = useTranslation()

  return (
    <Stack gap={10} w={{ base: '100%', sm: 400 }}>
      <Text fz={20} fw="bold">
        {t('Basic information')}
      </Text>
      <AddFormStaff {...props} />
    </Stack>
  )
}
