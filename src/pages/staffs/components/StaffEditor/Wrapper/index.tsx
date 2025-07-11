import { Stack, Text } from '@mantine/core'
import classes from './index.module.scss'

type WrapperProps = {
  title: string
  children: React.ReactNode
}

export default function Wrapper({ title, children }: WrapperProps) {
  return (
    <Stack className={classes.container}>
      <Text fz={20} fw="bold">
        {title}
      </Text>
      <Stack className={classes.content}>{children}</Stack>
    </Stack>
  )
}
