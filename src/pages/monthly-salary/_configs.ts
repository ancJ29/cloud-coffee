import { Salary, User } from '@/services/domain'
import { DataGridColumnProps } from '@/types'
import { formatDuration, formatNumber, ONE_HOUR } from '@/utils'

export const configs = (
  t: (key: string) => string,
  users: Map<string, User>,
): DataGridColumnProps[] => {
  return [
    {
      key: 'name',
      header: t('Name'),
      width: '25%',
      renderCell: (_, salary: Salary) => {
        return users.get(salary.userId)?.name || ''
      },
    },
    {
      key: 'standardHours',
      header: t('Standard hours'),
      width: '12%',
      textAlign: 'right',
      renderCell: (_, salary: Salary) => {
        return formatDuration(salary.standardHours * ONE_HOUR)
      },
    },
    {
      key: 'overtimeHours',
      header: t('Overtime hours'),
      width: '12%',
      textAlign: 'right',
      renderCell: (_, salary: Salary) => {
        return formatDuration(salary.overtimeHours * ONE_HOUR)
      },
    },
    {
      key: 'totalSalary',
      header: `${t('Total salary')} (VND)`,
      width: '20%',
      textAlign: 'right',
      renderCell: (_, salary: Salary) => {
        return formatNumber(salary.totalSalary)
      },
    },
  ]
}
