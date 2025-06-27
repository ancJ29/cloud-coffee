import useTranslation from '@/hooks/useTranslation'
import { Button, ButtonProps, Group } from '@mantine/core'

export default function SaveStaffButton({ ...props }: ButtonProps) {
  const t = useTranslation()

  return (
    <Group justify="flex-end" mt={10}>
      <Button type="submit" {...props}>
        {t('Save staff')}
      </Button>
    </Group>
  )
}
