import useAuthStore from '@/stores/auth.store'
import classes from './index.module.scss'

type WrapperProps = {
  children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  const { user } = useAuthStore()

  return (
    <div
      className={`${classes.container} ${user?.memo.isEmailVerified ? '' : classes.withEmailBanner}`}
    >
      {children}
    </div>
  )
}
