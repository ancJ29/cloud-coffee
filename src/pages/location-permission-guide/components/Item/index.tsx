import { Image, Stack, Text } from '@mantine/core'

type ItemProps = {
  index: number
  content: React.ReactNode
  image?: string
}

export default function Item({ index, content, image }: ItemProps) {
  return (
    <Stack gap={0}>
      <Text fz={16} px={10}>
        {`${index}. `}
        {content}
      </Text>
      {image && <Image src={image} />}
    </Stack>
  )
}
