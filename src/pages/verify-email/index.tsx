import useMount from '@/hooks/useMount'
import { verifyEmail } from '@/services/domain'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VerifyEmailView from './components/VerifyEmailView'

export type VerifyState = 'loading' | 'success' | 'no-token' | 'expired'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [state, setState] = useState<VerifyState>('loading')

  const verifyEmailToken = async () => {
    if (!token) {
      setState('no-token')
      return
    }
    const res = await verifyEmail({ token })
    if (res?.success) {
      setState('success')
      window.location.href = '/login'
    } else {
      setState('expired')
    }
  }
  useMount(verifyEmailToken)

  return <VerifyEmailView state={state} />
}
