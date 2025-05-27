import useTranslation from '@/hooks/useTranslation'
import { Anchor, Stack, Text } from '@mantine/core'
import { QRCodeCanvas } from 'qrcode.react'

type QRCodeForAttendanceViewProps = {
  qrValue: string
}

export default function QRCodeForAttendanceView({ qrValue }: QRCodeForAttendanceViewProps) {
  const t = useTranslation()

  return (
    <Stack gap={30} align="center" justify="center" h="90dvh">
      <QRCodeCanvas value={qrValue} size={350} />
      <Stack gap={10} align="center">
        <Text fz={20} ta="center">
          {t('Scan the QR code to go to the check-in/check-out page')}
        </Text>
        <Text fz={20} ta="center">
          {`${t('Or click')} `}
          <Anchor href={qrValue} target="_blank" fz={20}>
            {t('here')}
          </Anchor>
          {` ${t('to access the page')}`}
        </Text>
      </Stack>
    </Stack>
  )
}
