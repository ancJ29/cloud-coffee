import { RouteConfig } from '@/types'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ServiceWrapper = lazy(() => import('@/layouts/Auth'))
const WorkEntryWrapper = lazy(() => import('@/layouts/WorkEntry'))

const routeConfigs: RouteConfig[] = [
  {
    path: '/*',
    element: () => <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: lazy(() => import('@/pages/login')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/reset-password',
    element: lazy(() => import('@/pages/reset-password')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/reset-password/check-email',
    element: lazy(() => import('@/pages/check-email')),
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
  {
    path: '/location-permission-guide',
    element: lazy(() => import('@/pages/location-permission-guide')),
  },
]

const guestRoutes = routeConfigs.map(({ path, element: Component, wrapper: Wrapper }) => ({
  path,
  element: Wrapper ? (
    <Wrapper>
      <Component />
    </Wrapper>
  ) : (
    <Component />
  ),
}))

export default guestRoutes
