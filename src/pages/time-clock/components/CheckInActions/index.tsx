import useTranslation from '@/hooks/useTranslation'
import { SimpleGrid } from '@mantine/core'
import { IconArrowBarLeft, IconArrowBarRight, IconClock } from '@tabler/icons-react'
import CustomButton from '../CustomButton'

type CheckInActionsProps = {
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function CheckInActions({ onCheckIn, onCheckOut }: CheckInActionsProps) {
  const t = useTranslation()

  return (
    <SimpleGrid cols={2} spacing={6} verticalSpacing={6} w="100%">
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
    </SimpleGrid>
  )
}
