import useAuthStore from '@/stores/auth.store'
import classes from './index.module.scss'

type ContentLayoutProps = {
  children: React.ReactNode
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  const { user } = useAuthStore()

  return (
    <div className={`${classes.container} ${user?.isEmailVerified ? '' : classes.withEmailBanner}`}>
      {children}
    </div>
  )
}
