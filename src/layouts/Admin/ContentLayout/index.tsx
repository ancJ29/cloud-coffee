import classes from './index.module.scss'

type ContentLayoutProps = {
  children: React.ReactNode
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return <div className={classes.container}>{children}</div>
}
