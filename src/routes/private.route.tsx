import { RouteConfig } from '@/types'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const AdminWrapper = lazy(() => import('@/layouts/Admin'))
const WorkEntryWrapper = lazy(() => import('@/layouts/WorkEntry'))

const routeConfigs: RouteConfig[] = [
  {
    path: '/*',
    element: () => <Navigate to="/users" />,
  },
  {
    path: '/users',
    element: lazy(() => import('@/pages/users')),
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
