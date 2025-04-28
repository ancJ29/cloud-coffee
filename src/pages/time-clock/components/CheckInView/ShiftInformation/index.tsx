import useTranslation from '@/hooks/useTranslation'
import { Shift } from '@/services/domain'
import { formatDuration, formatTime, ONE_MINUTE } from '@/utils'
import { Stack, Text } from '@mantine/core'
import { useEffect, useState } from 'react'

type ShiftInformationProps = {
  shift?: Shift
}

export default function ShiftInformation({ shift }: ShiftInformationProps) {
  const t = useTranslation()
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    setDuration((shift?.end || Date.now()) - (shift?.start || Date.now()))
  }, [shift])

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((shift?.end || Date.now()) - (shift?.start || Date.now()))
    }, ONE_MINUTE)
    return () => clearInterval(interval)
  }, [shift?.end, shift?.start])

  return (
    <Stack gap={0} mt={20} about="center">
      <Text ta="center">
        {shift
          ? `- ${t('Check in at')} ${formatTime(shift.start, 'HH:mm A')}`
          : t('You have not checked in today')}
      </Text>

      {shift?.end && (
        <Text ta="center">{`- ${t('Check out at')} ${formatTime(shift.end, 'HH:mm A')}`}</Text>
      )}

      <Text fz={20} ta="center" fw={500} mt={20}>
        {t('Hour this period')}
      </Text>

      <Text fz={28} fw="bold" ta="center">
        {`${formatDuration(duration)}`}
      </Text>
    </Stack>
  )
}
