import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'
import { UpdateStaffForm } from '../../_configs'
import BasicInformationForm from './BasicInformationForm'

export default function BasicInformation({ ...props }: UpdateStaffForm) {
  const t = useTranslation()

  return (
    <Stack gap={10} w={{ base: '100%', sm: 400 }}>
      <Text fz={20} fw="bold">
        {t('Basic information')}
      </Text>
      <BasicInformationForm {...props} />
    </Stack>
  )
}
