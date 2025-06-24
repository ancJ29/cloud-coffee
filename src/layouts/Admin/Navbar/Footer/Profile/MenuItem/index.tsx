import { Box, Text } from '@mantine/core'
import classes from './index.module.scss'

type MenuItemProps = {
  leftIcon: React.ReactNode
  label: string | React.ReactNode
  onClick?: () => void
  rightIcon?: React.ReactNode
  style?: React.CSSProperties
  onCloseMenu?: () => void
}

export default function MenuItem({
  leftIcon,
  label,
  onClick,
  rightIcon,
  style,
  onCloseMenu,
}: MenuItemProps) {
  const _onClick = () => {
    onCloseMenu?.()
    onClick?.()
  }

  return (
    <Box className={classes.container} onClick={_onClick} style={style}>
      <div className={classes.item}>
        {leftIcon}
        {typeof label === 'string' ? <Text fz={12}>{label}</Text> : label}
      </div>

      {rightIcon}
    </Box>
  )
}
