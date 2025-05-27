import { ClientRoles, MenuItem } from '@/types'
import { IconCalendar, IconCash, IconQrcode, IconUserCircle } from '@tabler/icons-react'

export const navMenu: MenuItem[] = [
  {
    key: 'users',
    label: 'User management',
    icon: IconUserCircle,
    url: '/users',
    roles: [ClientRoles.OWNER],
  },
  {
    key: 'timesheet',
    label: 'Timesheet',
    icon: IconCalendar,
    url: '/timesheet',
    roles: [ClientRoles.OWNER],
  },
  {
    key: 'monthly-salary',
    label: 'Monthly salary management',
    icon: IconCash,
    url: '/monthly-salary',
    roles: [ClientRoles.OWNER],
  },
  {
    key: 'qr-code-for-attendance',
    label: 'QR Code for attendance',
    icon: IconQrcode,
    url: '/qr-code-for-attendance',
    roles: [ClientRoles.OWNER],
  },
]
