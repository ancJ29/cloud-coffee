import { CollapseProps, Collapse as MantineCollapse } from '@mantine/core'

export function Collapse({ ...props }: CollapseProps) {
  return (
    <MantineCollapse
      {...props}
      transitionDuration={300}
      transitionTimingFunction="linear"
      style={{ display: props.in ? 'block' : 'none' }}
    />
  )
}
