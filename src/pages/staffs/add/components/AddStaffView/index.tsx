import useTranslation from '@/hooks/useTranslation'
import { Stack, Tabs, Text } from '@mantine/core'
import { Tabs as TabsEnum } from '../../../_configs'
import { AddStaffForm, tabs } from '../../_configs'
import classes from './index.module.scss'

export default function AddStaffView({ ...props }: AddStaffForm) {
  const t = useTranslation()

  return (
    <div className={classes.container}>
      <Text fz={20} fw="bold">
        {t('Add staff')}
      </Text>
      <Tabs defaultValue={TabsEnum.BASIC_INFORMATION} variant="outline">
        <Tabs.List grow justify="space-between" className={classes.tabList}>
          {tabs.map((tab, idx) => (
            <Tabs.Tab key={idx} value={tab.label}>
              {t(tab.label)}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab, idx) => (
          <Tabs.Panel key={idx} value={tab.label} px={10} pt={10}>
            <Stack align="center" justify="center" mt={10}>
              <tab.content {...props} />
            </Stack>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  )
}
