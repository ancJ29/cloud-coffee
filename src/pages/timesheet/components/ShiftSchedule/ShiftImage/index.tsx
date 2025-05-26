import useTranslation from '@/hooks/useTranslation'
import { Shift } from '@/services/domain'
import { Image, SimpleGrid, Stack, Text } from '@mantine/core'

type ShiftImageProps = {
  shift: Shift
}

export default function ShiftImage({ shift }: ShiftImageProps) {
  const t = useTranslation()

  return (
    <SimpleGrid cols={2}>
      <Item title={t('Clock in')} content={shift.startImageUrl} />
      <Item title={t('Clock out')} content={shift.endImageUrl} />
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
      <Text fz={16}>{title}</Text>
      <Image src={content} fallbackSrc="/imgs/timesheet/no-image.jpg" radius="md" />
    </Stack>
  )
}
