import useTranslation from '@/hooks/useTranslation'
import { Stack, Tabs, Text } from '@mantine/core'
import { Tabs as TabsEnum, tabs } from '../../_configs'

export default function LocationPermissionGuideView() {
  const t = useTranslation()

  return (
    <Stack gap={10}>
      <Text fw="bold" fz={20} ta="center" w="100%" py={10}>
        {t('Location access permission instructions')}
      </Text>
      <Tabs defaultValue={TabsEnum.IOS}>
        <Tabs.List grow justify="space-between">
          {tabs.map((tab, idx) => (
            <Tabs.Tab key={idx} value={tab.label} leftSection={<tab.icon />}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab, idx) => (
          <Tabs.Panel key={idx} value={tab.label} px={10} pt={10}>
            <tab.content />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Stack>
  )
}
