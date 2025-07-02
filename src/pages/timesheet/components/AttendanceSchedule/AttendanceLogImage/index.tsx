import useTranslation from '@/hooks/useTranslation'
import { AttendanceLog } from '@/services/domain'
import { Image, SimpleGrid, Stack, Text } from '@mantine/core'

type AttendanceLogImageProps = {
  attendanceLog: AttendanceLog
}

export default function AttendanceLogImage({ attendanceLog }: AttendanceLogImageProps) {
  const t = useTranslation()

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      <Item title={t('Clock in')} content={attendanceLog.startImageUrl} />
      <Item title={t('Clock out')} content={attendanceLog.endImageUrl} />
    </SimpleGrid>
  )
}

type ItemProps = {
  title: string
  content?: string | null
}
function Item({ title, content }: ItemProps) {
  return (
    <Stack gap={2}>
      <Text fz={16} fw={500} ml={6}>
        {title}
      </Text>
      <Image src={content} fallbackSrc="/imgs/timesheet/no-image.jpg" radius="md" />
    </Stack>
  )
}
