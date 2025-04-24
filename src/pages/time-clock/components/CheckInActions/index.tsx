import useTranslation from '@/hooks/useTranslation'
import { showNotImplementedModal } from '@/utils'
import { SimpleGrid } from '@mantine/core'
import {
  IconArrowBarRight,
  IconClock,
  IconMugFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react'
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
        rightSection={IconArrowBarRight}
      />
      <CustomButton
        title={t('Clock out')}
        onClick={onCheckOut}
        leftSection={IconClock}
        rightSection={IconArrowBarRight}
      />
      <CustomButton
        title={t('Start break')}
        onClick={() => showNotImplementedModal(t)}
        leftSection={IconPlayerPlayFilled}
        rightSection={IconMugFilled}
      />
      <CustomButton
        title={t('End break')}
        onClick={() => showNotImplementedModal(t)}
        leftSection={IconPlayerStopFilled}
        rightSection={IconMugFilled}
      />
    </SimpleGrid>
  )
}
