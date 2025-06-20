import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { addUser, AddUserRequest } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useUserStore from '@/stores/user.store'
import { ClientRoles } from '@/types'
import { Stack, Tabs, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useCallback } from 'react'
import z from 'zod'
import { tabs, Tabs as TabsEnum } from '../../_configs'
import classes from './AddStaffView.module.scss'

const initialValues: AddUserRequest = {
  name: '',
  roleId: '',
}

export default function AddStaffView() {
  const t = useTranslation()
  const { load } = useUserStore()
  const { roles } = useRoleStore()
  const form = useForm<AddUserRequest>({
    initialValues,
    validate: zodResolver(schema(t)),
  })

  const handleSubmit = useCallback(
    (values: AddUserRequest) => {
      addUser({
        ...values,
        roleId:
          Array.from(roles.values()).find((role) => role.name === ClientRoles.STAFF)?.id || '',
      }).then((res) => {
        const success = res?.success
        showNotification({ t, type: success ? 'info' : 'error' })
        load(true)
      })
    },
    [load, roles, t],
  )

  return (
    <div className={classes.container}>
      <Text fz={20} fw="bold">
        {t('Add staff')}
      </Text>
      <Tabs defaultValue={TabsEnum.BASIC_INFORMATION} variant="outline">
        <Tabs.List grow justify="space-between" classNames={classes} className={classes.tabList}>
          {tabs.map((tab, idx) => (
            <Tabs.Tab key={idx} value={tab.label}>
              {t(tab.label)}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab, idx) => (
          <Tabs.Panel key={idx} value={tab.label} px={10} pt={10}>
            <Stack align="center" justify="center" mt={10}>
              <tab.content form={form} onSubmit={handleSubmit} />
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
  })
