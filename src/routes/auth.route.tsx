import { RouteConfig } from '@/types'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ServiceWrapper = lazy(() => import('@/layouts/ServiceWrapper'))
const WorkEntryWrapper = lazy(() => import('@/layouts/WorkEntryWrapper'))

const routeConfigs: RouteConfig[] = [
  {
    path: '/*',
    element: () => <Navigate to="/timesheet" />,
  },
  {
    path: '/users',
    element: lazy(() => import('@/pages/users')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/timesheet',
    element: lazy(() => import('@/pages/timesheet')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/profile',
    element: lazy(() => import('@/pages/profile')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/change-password',
    element: lazy(() => import('@/pages/change-password')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/monthly-salary',
    element: lazy(() => import('@/pages/monthly-salary')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/check-in-qr',
    element: lazy(() => import('@/pages/check-in-qr')),
    wrapper: ServiceWrapper,
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
