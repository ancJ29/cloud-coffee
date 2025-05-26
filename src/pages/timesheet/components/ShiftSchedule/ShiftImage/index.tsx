import useTranslation from '@/hooks/useTranslation'
import { Shift } from '@/services/domain'
import { Flex, Image, Stack, Text } from '@mantine/core'

type ShiftImageProps = {
  shift: Shift
}

export default function ShiftImage({ shift }: ShiftImageProps) {
  const t = useTranslation()

  return (
    <Flex gap={10} direction={{ base: 'column', sm: 'row' }}>
      <Item title={t('Check in')} content={shift.startImageUrl} />
      <Item title={t('Check out')} content={shift.endImageUrl} />
    </Flex>
  )
}

type ItemProps = {
  title: string
  content?: string | null
}
function Item({ title, content }: ItemProps) {
  return (
    <Stack gap={10}>
      <Text fw="bold">{title}</Text>
      <Image src={content} />
    </Stack>
  )
}
