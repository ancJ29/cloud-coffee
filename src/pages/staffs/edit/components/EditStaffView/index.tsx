import { Avatar } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Flex, Stack, Tabs, Text } from '@mantine/core'
import { Tabs as TabsEnum } from '../../../_configs'
import { tabs, UpdateStaffForm } from '../../_configs'
import classes from './index.module.scss'

export default function EditStaffView({ ...props }: UpdateStaffForm) {
  const t = useTranslation()

  return (
    <div className={classes.container}>
      <Flex gap={10} align="center">
        <Avatar size={60} src={props.form.values.avatar} />
        <Text fz={20} fw="bold">
          {t('Update staff')}
        </Text>
      </Flex>
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
