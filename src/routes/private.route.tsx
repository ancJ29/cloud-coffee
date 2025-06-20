import { RouteConfig } from '@/types'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const AdminWrapper = lazy(() => import('@/layouts/Admin'))
const WorkEntryWrapper = lazy(() => import('@/layouts/WorkEntry'))
const AuthWrapper = lazy(() => import('@/layouts/Auth'))

const routeConfigs: RouteConfig[] = [
  {
    path: '/*',
    element: () => <Navigate to="/staffs" />,
  },
  {
    path: '/dashboard',
    element: lazy(() => import('@/pages/dashboard')),
    wrapper: AdminWrapper,
  },
  {
    path: '/staffs',
    element: lazy(() => import('@/pages/staffs')),
    wrapper: AdminWrapper,
  },
  {
    path: '/staffs/add',
    element: lazy(() => import('@/pages/staffs/add')),
    wrapper: AdminWrapper,
  },
  {
    path: '/staffs/edit',
    element: lazy(() => import('@/pages/staffs/edit')),
    wrapper: AdminWrapper,
  },
  {
    path: '/timesheet',
    element: lazy(() => import('@/pages/timesheet')),
    wrapper: AdminWrapper,
  },
  {
    path: '/profile',
    element: lazy(() => import('@/pages/profile')),
    wrapper: AdminWrapper,
  },
  {
    path: '/change-password',
    element: lazy(() => import('@/pages/change-password')),
    wrapper: AdminWrapper,
  },
  {
    path: '/monthly-salary',
    element: lazy(() => import('@/pages/monthly-salary')),
    wrapper: AdminWrapper,
  },
  {
    path: '/qr-code-for-attendance',
    element: lazy(() => import('@/pages/qr-code-for-attendance')),
    wrapper: AdminWrapper,
  },
  {
    path: '/work-entry',
    element: lazy(() => import('@/pages/work-entry')),
    wrapper: WorkEntryWrapper,
  },
  {
    path: '/working-status',
    element: lazy(() => import('@/pages/working-status')),
    wrapper: WorkEntryWrapper,
  },
  {
    path: '/time-clock',
    element: lazy(() => import('@/pages/time-clock')),
  },
  {
    path: '/location-permission-guide',
    element: lazy(() => import('@/pages/location-permission-guide')),
  },
  {
    path: '/verify-email',
    element: lazy(() => import('@/pages/verify-email')),
    wrapper: AuthWrapper,
  },
]

const authRoutes = routeConfigs.map(({ path, element: Component, wrapper: Wrapper }) => {
  return {
    path,
    element: Wrapper ? (
      <Wrapper>
        <Component />
      </Wrapper>
    ) : (
      <Component />
    ),
  }
})

export default authRoutes
