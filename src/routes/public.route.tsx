import { RouteConfig } from '@/types'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const AuthWrapper = lazy(() => import('@/layouts/Auth'))
const WorkEntryWrapper = lazy(() => import('@/layouts/WorkEntry'))

const routeConfigs: RouteConfig[] = [
  {
    path: '/*',
    element: () => <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: lazy(() => import('@/pages/login')),
    wrapper: AuthWrapper,
  },
  {
    path: '/forgot-password',
    element: lazy(() => import('@/pages/forgot-password')),
    wrapper: AuthWrapper,
  },
  {
    path: '/reset-password',
    element: lazy(() => import('@/pages/reset-password')),
    wrapper: AuthWrapper,
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
  },
]

export const publicRoutes = routeConfigs.map(({ path, element: Component, wrapper: Wrapper }) => ({
  path,
  element: Wrapper ? (
    <Wrapper>
      <Component />
    </Wrapper>
  ) : (
    <Component />
  ),
}))
