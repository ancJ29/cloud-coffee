import useTranslation from '@/hooks/useTranslation'
import { Button, Drawer, Flex, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode } from 'react'

type FilterWrapperProps = {
  children: ReactNode
}

export function FilterWrapper({ children }: FilterWrapperProps) {
  const t = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Flex visibleFrom="sm" gap={10} justify="end" align="end">
        {children}
      </Flex>
      <Flex justify="end" align="end" hiddenFrom="sm">
        <Button onClick={open} size="sm">
          {t('Filter')}
        </Button>
        <Drawer opened={opened} onClose={close} position="right" size="xs" hiddenFrom="sm">
          <Stack gap={35} align="end" pt={15}>
            {children}
          </Stack>
        </Drawer>
      </Flex>
    </>
  )
}
