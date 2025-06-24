import useTranslation from '@/hooks/useTranslation'
import { Button, Flex, Stack, Text } from '@mantine/core'

type DeleteStaffFormProps = {
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteStaffForm({ onConfirm, onCancel }: DeleteStaffFormProps) {
  const t = useTranslation()

  return (
    <Stack gap={10}>
      <Text>
        <>
          {t('Are you sure you want to do this? This action will')}{' '}
          <strong>{t('permanently delete')}</strong> {t(`all of this staff's data and`)}{' '}
          <strong>{t('cannot be recovered')}</strong>
        </>
      </Text>
      <Flex gap={10} justify="end">
        <Button color="var(--btn-danger)" onClick={onConfirm}>
          {t('Confirm')}
        </Button>
        <Button color="var(--btn-cancel)" onClick={onCancel}>
          {t('Cancel')}
        </Button>
      </Flex>
    </Stack>
  )
}
