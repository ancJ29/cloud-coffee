import classes from './index.module.scss'

type WrapperProps = {
  children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  return <div className={classes.container}>{children}</div>
}
