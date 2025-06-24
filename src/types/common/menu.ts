import { MantineBreakpoint } from '@mantine/core'

export type MenuItem = {
  key: string
  label: string
  url?: string
  onClick?: () => void
  visibleFrom?: MantineBreakpoint
  subs?: MenuItem[]
}
