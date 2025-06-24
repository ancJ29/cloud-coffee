import { Stack } from '@mantine/core'
import classes from './index.module.scss'

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Stack className={classes.container}>
      <Stack className={classes.content}>{children}</Stack>
    </Stack>
  )
}
