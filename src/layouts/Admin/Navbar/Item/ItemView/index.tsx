import useTranslation from '@/hooks/useTranslation'
import { MenuItem } from '@/types'
import { Collapse, Flex, Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import Item from '..'

type ItemViewProps = {
  menuItem: MenuItem
  opened: boolean
  isActiveSection: boolean
  ml?: number
  onClick: () => void
  level?: number
  isMobile: boolean
  closeNavbar?: () => void
}

export default function ItemView({
  menuItem,
  opened,
  isActiveSection = false,
  ml = 0,
  onClick,
  level = 0,
  isMobile,
  closeNavbar,
}: ItemViewProps) {
  const t = useTranslation()

  return (
    <>
      <UnstyledButton
        onClick={onClick}
        py={6}
        pl={`${isMobile ? 0 : ml}rem`}
        c={isActiveSection ? 'var(--menu-item-selected)' : 'white'}
        visibleFrom={menuItem.visibleFrom}
        w="-webkit-fill-available"
      >
        <Flex justify={isMobile ? 'center' : 'space-between'} align="center">
          <Flex gap={8} align="end">
            <Text fz={14} fw={level === 0 ? 'bold' : 300}>
              {t(menuItem.label)}
            </Text>
          </Flex>
          {menuItem.subs && !isMobile && (
            <IconChevronRight
              size={16}
              stroke={2}
              style={{
                transform: opened ? 'rotate(90deg)' : 'none',
                transition: 'transform 200ms ease',
                marginTop: '1px',
              }}
            />
          )}
        </Flex>
      </UnstyledButton>
      {menuItem.subs && (
        <Collapse in={opened}>
          {menuItem.subs.map((subMenuItem) => (
            <Item
              key={subMenuItem.key}
              menuItem={subMenuItem}
              level={level + 1}
              isMobile={isMobile}
              closeNavbar={closeNavbar}
            />
          ))}
        </Collapse>
      )}
    </>
  )
}
