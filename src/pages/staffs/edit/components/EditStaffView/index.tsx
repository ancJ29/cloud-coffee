import useTranslation from '@/hooks/useTranslation'
import { Stack, Tabs, Text } from '@mantine/core'
import { Tabs as TabsEnum } from '../../../_configs'
import { tabs, UpdateStaffForm } from '../../_configs'
import classes from './EditStaffView.module.scss'

export default function EditStaffView({ ...props }: UpdateStaffForm) {
  const t = useTranslation()

  return (
    <div className={classes.container}>
      <Text fz={20} fw="bold">
        {t('Update staff')}
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
