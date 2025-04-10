import { ActionIcon, Affix, AffixProps, useMantineColorScheme } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

type AddButtonProps = {
  onClick: () => void
} & AffixProps

export default function AddButton({ onClick, ...props }: AddButtonProps) {
  const { colorScheme } = useMantineColorScheme()
  return (
    <Affix position={{ bottom: 16, right: 16 }} {...props}>
      <ActionIcon variant="filled" radius="xl" size={40} onClick={onClick}>
        <IconPlus size={26} color={colorScheme === 'light' ? 'white' : 'black'} />
      </ActionIcon>
    </Affix>
  )
}
