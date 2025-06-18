import { MenuItem } from '@/types'
import {
  IconBuildingCottage,
  IconCalendar,
  IconCash,
  IconQrcode,
  IconUserCircle,
} from '@tabler/icons-react'

export const navMenu: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: IconBuildingCottage,
    url: '/dashboard',
  },
  {
    key: 'users',
    label: 'User management',
    icon: IconUserCircle,
    url: '/users',
  },
  {
    key: 'timesheet',
    label: 'Timesheet',
    icon: IconCalendar,
    url: '/timesheet',
  },
  {
    key: 'monthly-salary',
    label: 'Monthly salary management',
    icon: IconCash,
    url: '/monthly-salary',
  },
  {
    key: 'qr-code-for-attendance',
    label: 'QR Code for attendance',
    icon: IconQrcode,
    url: '/qr-code-for-attendance',
    visibleFrom: 'sm',
  },
]
