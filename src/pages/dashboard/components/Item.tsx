import { Stack, Text } from '@mantine/core'

type ItemProps = {
  title: string
  content: string | React.ReactNode
}

export default function Item({ title, content }: ItemProps) {
  return (
    <Stack
      align="center"
      gap={4}
      w={{ base: '80%', sm: 350 }}
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '5px',
        padding: '20px',
      }}
    >
      <Text fw="bold" fz={16}>
        {title}
      </Text>
      <Text fz={36} c="var(--time-clock-primary)" lh="normal">
        {content}
      </Text>
    </Stack>
  )
}
