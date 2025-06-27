import { Collapse } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { Checkbox, Stack } from '@mantine/core'
import { useState } from 'react'
import SaveStaffButton from '../SaveStaffButton'

export default function RoleAndPermissions() {
  const t = useTranslation()
  const [isAdministrator, setIsAdministrator] = useState(false)
  const [canAccessMobileApp, setCanAccessMobileApp] = useState(false)

  return (
    <Stack gap={20} w="100%">
      {/* <Select label={t('Manage')} options={[]} /> */}
      <Checkbox label={t('This staff is a manager of other staffs')} />
      <Checkbox label={t('This staff can manage teams of staffs')} />
      <Checkbox
        checked={isAdministrator}
        onChange={(e) => setIsAdministrator(e.target.checked)}
        label={t('This staff is an administrator')}
      />
      <Collapse in={isAdministrator} ml={32}>
        <Checkbox
          label={t(
            'Are you sure you want this user to have administrator access? This will give them access to all data for your organization',
          )}
        />
      </Collapse>
      {/* <Select label={t('Team')} options={[]} /> */}
      <Checkbox
        checked={canAccessMobileApp}
        onChange={(e) => setCanAccessMobileApp(e.target.checked)}
        label={t('Can access the Mobile App')}
      />
      <Collapse in={canAccessMobileApp}>
        <Checkbox label={t('Require GPS on Mobile')} />
      </Collapse>
      <Checkbox label={t('Can Clock in on Web')} />
      <Checkbox label={t('Skip Clock In/Out Notifications for this staff')} />
      <Checkbox label={t('Can submit Manual Timesheet')} />
      <SaveStaffButton />
    </Stack>
  )
}
