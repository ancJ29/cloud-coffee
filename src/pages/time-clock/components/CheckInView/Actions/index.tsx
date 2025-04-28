import useTranslation from '@/hooks/useTranslation'
import { Stack } from '@mantine/core'
import { IconArrowBarLeft, IconArrowBarRight, IconClock } from '@tabler/icons-react'
import CustomButton from '../CustomButton'

type ActionsProps = {
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function Actions({ onCheckIn, onCheckOut }: ActionsProps) {
  const t = useTranslation()

  return (
    <Stack gap={12}>
      <CustomButton
        title={t('Clock in')}
        onClick={onCheckIn}
        leftSection={IconClock}
        rightSection={IconArrowBarLeft}
      />
      <CustomButton
        title={t('Clock out')}
        onClick={onCheckOut}
        leftSection={IconClock}
        rightSection={IconArrowBarRight}
      />
    </Stack>
  )
}
