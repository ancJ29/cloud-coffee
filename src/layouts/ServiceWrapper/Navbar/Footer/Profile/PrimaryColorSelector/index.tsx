import { useCustomTheme } from '@/hooks/useCustomTheme'
import useTranslation from '@/hooks/useTranslation'
import { ActionIcon, Menu, SimpleGrid, UnstyledButton } from '@mantine/core'
import { IconCheck, IconChevronRight, IconPalette } from '@tabler/icons-react'
import MenuItem from '../MenuItem'

export default function PrimaryColorSelector() {
  const t = useTranslation()
  const { primaryColor, changPrimaryColor } = useCustomTheme()

  return (
    <Menu
      width={150}
      trigger="click-hover"
      openDelay={100}
      closeDelay={150}
      position="right"
      radius={10}
      shadow="md"
      offset={10}
      zIndex={1200}
    >
      <Menu.Target>
        <UnstyledButton w="100%">
          <MenuItem
            leftIcon={<IconPalette size={20} strokeWidth={1.5} />}
            label={t('Primary color')}
            rightIcon={<IconChevronRight size={20} strokeWidth={1.5} />}
          />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown p={10}>
        <SimpleGrid cols={4} spacing={2} verticalSpacing={4}>
          {swatches.map((color, idx) => (
            <ActionIcon
              key={idx}
              color={color}
              variant="filled"
              onClick={() => changPrimaryColor(color)}
            >
              {primaryColor === color ? <IconCheck size={24} /> : null}
            </ActionIcon>
          ))}
        </SimpleGrid>
      </Menu.Dropdown>
    </Menu>
  )
}

const swatches = [
  '#fa5252',
  '#fd7e14',
  '#fab005',
  '#3693ff',
  '#12b886',
  '#15aabf',
  '#be4bdb',
  '#7950f2',
]
