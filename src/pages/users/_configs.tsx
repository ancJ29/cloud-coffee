import { Role, SalaryRule, User } from '@/services/domain'
import { DataGridColumnProps, FilterProps, OptionProps } from '@/types'
import ShareUserUrlButton from './components/ShareUserUrlButton'
import Status from './components/Status'

export const configs = (
  t: (key: string) => string,
  roles: Map<string, Role>,
  salaryRules: Map<string, SalaryRule>,
): DataGridColumnProps[] => {
  return [
    {
      key: 'name',
      sortable: true,
      header: t('Name'),
      width: '20%',
    },
    {
      key: 'email',
      header: t('Email'),
      width: '20%',
      renderCell: (_, user: User) => {
        return user.email || '-'
      },
    },
    {
      key: 'role',
      header: t('Role'),
      width: '10%',

      renderCell: (_, user: User) => {
        return t(roles.get(user.roleId)?.name || '')
      },
    },
    {
      key: 'salaryRule',
      header: t('Salary rule'),
      width: '15%',
      renderCell: (_, user: User) => {
        return salaryRules.get(user.salaryRuleId || '')?.name || ''
      },
    },
    {
      key: 'active',
      header: t('Status'),
      width: '20%',
      textAlign: 'center',
      renderCell: (_, user: User) => {
        return <Status enabled={user.enabled} />
      },
    },
    {
      key: 'checkin-link',
      header: t('Checkin link'),
      width: '15%',
      textAlign: 'center',
      style: { alignItems: 'center' },
      renderCell: (_, user: User) => {
        return <ShareUserUrlButton user={user} />
      },
    },
  ]
}

export type FilterComponentProps = FilterProps<FilterType> & {
  roleOptions: OptionProps[]
}

export type FilterType = {
  roleId: string | null
}

export const defaultCondition: FilterType = {
  roleId: null,
}

export function filter(user: User, condition?: FilterType) {
  if (condition?.roleId && user.roleId !== condition.roleId) {
    return false
  }
  return true
}
