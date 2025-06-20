import useTranslation from '@/hooks/useTranslation'
import { getEmailSchema, getPhoneSchema } from '@/utils'
import { Stack, Tabs, Text } from '@mantine/core'
import z from 'zod'
import { AddStaffForm, tabs, Tabs as TabsEnum } from '../../_configs'
import classes from './AddStaffView.module.scss'

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

export const schema = (t: (key: string) => string) =>
  z.object({
    name: z.string().trim().min(1, t('Please enter staff name')),
    email: getEmailSchema(t, { required: false }),
    phone: getPhoneSchema(t, { required: false }),
  })
