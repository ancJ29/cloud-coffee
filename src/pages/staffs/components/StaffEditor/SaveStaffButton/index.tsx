import useTranslation from '@/hooks/useTranslation'
import { Button, ButtonProps, Flex } from '@mantine/core'

export default function SaveStaffButton({ ...props }: ButtonProps) {
  const t = useTranslation()

  return (
    <Flex justify={{ base: 'center', sm: 'end' }} mt={10}>
      <Button type="submit" {...props}>
        {t('Save staff')}
      </Button>
    </Flex>
  )
}
