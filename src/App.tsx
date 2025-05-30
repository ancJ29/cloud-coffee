import LoadingOverlay from '@/components/common/LoadingOverlay'
import { resolver } from '@/configs/themes'
import { useCustomTheme } from '@/hooks/useCustomTheme'
import useTranslation from '@/hooks/useTranslation'
import privateRoutes from '@/routes/private.route'
import publicRoutes from '@/routes/public.route'
import loadingStore from '@/services/request/store/loading'
import useAuthStore from '@/stores/auth.store'
import useMetadataStore from '@/stores/metadata'
import useRoleStore from '@/stores/role.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import useUserStore from '@/stores/user.store'
import useVenueStore from '@/stores/venue.store'
import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useRoutes } from 'react-router-dom'

export default function App() {
  const t = useTranslation()
  const { theme } = useCustomTheme()
  const loadingGlobal = useSyncExternalStore(loadingStore.subscribe, loadingStore.getSnapshot)
  const { token, user } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData(token, t).then(() => {
      setLoading(false)
    })
  }, [t, token])

  const routes = useMemo(() => {
    return _buildRoutes(loading, !!user)
  }, [user, loading])

  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <Notifications position="top-right" zIndex={1000} w={300} />
      <ModalsProvider>
        <DatesProvider settings={{ locale: 'vi' }}>
          <LoadingOverlay visible={loadingGlobal} />
          <Suspense fallback={<LoadingOverlay />}>{useRoutes(routes)}</Suspense>
        </DatesProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}

function _buildRoutes(loading: boolean, login: boolean) {
  if (loading) {
    return [
      {
        path: '/*',
        element: <LoadingOverlay />,
      },
    ]
  }
  return login ? privateRoutes : publicRoutes
}

async function loadData(token: string | null, t: (key: string) => string) {
  await useMetadataStore.getState().checkVersion()
  if (!token) {
    return
  }
  await useAuthStore.getState().getMe(t)
  if (useAuthStore.getState().token) {
    await Promise.all([
      useRoleStore.getState().load(),
      useVenueStore.getState().load(),
      useSalaryRuleStore.getState().load(),
      useUserStore.getState().load(),
    ])
  }
}
