type IconCornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

import classes from './IconCorner.module.scss'

type IconCornerProps = {
  position: IconCornerPosition
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export default function IconCorner({ position, top, bottom, left, right }: IconCornerProps) {
  const style: React.CSSProperties = {
    position: 'absolute',
    top,
    bottom,
    left,
    right,
  }

  return <div className={`${classes.corner} ${classes[position]}`} style={style} />
}
