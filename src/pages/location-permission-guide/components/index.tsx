import { Tabs } from '@mantine/core'
import { Tabs as TabsEnum, tabs } from '../_configs'

export default function LocationPermissionGuideView() {
  return (
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
  )
}
