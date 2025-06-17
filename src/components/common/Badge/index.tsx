import { BadgeProps, Badge as MantineBadge, useMantineColorScheme } from '@mantine/core'

export default function Badge({ ...props }: BadgeProps) {
  const { colorScheme } = useMantineColorScheme()

  return <MantineBadge variant={colorScheme === 'light' ? 'outline' : 'light'} {...props} />
}
