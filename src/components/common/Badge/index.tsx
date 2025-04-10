import {
  Badge as MantineBadge,
  BadgeProps as MantineBadgeProps,
  useMantineColorScheme,
} from '@mantine/core'

interface BadgeProps extends MantineBadgeProps {}

export default function Badge({ ...props }: BadgeProps) {
  const { colorScheme } = useMantineColorScheme()

  return <MantineBadge variant={colorScheme === 'light' ? 'outline' : 'light'} {...props} />
}
