import useTranslation from '@/hooks/useTranslation'
import { Box, Image, Text } from '@mantine/core'
import { TabProps } from '../../_configs'
import classes from './TabItem.module.scss'

type TabItemProps = {
  tab: TabProps
  isSelected: boolean
  onClick: () => void
}

export default function TabItem({ tab, isSelected, onClick }: TabItemProps) {
  const t = useTranslation()

  return (
    <Box className={classes.item} onClick={onClick}>
      {isSelected && <div className={classes.line} />}
      <Image
        w={tab.iconWidth || 24}
        h={24}
        flex="none"
        fit="fill"
        src={`/imgs/time-clock/${tab.icon}${isSelected ? '-active' : ''}.svg`}
      />
      <Text className={classes.label} c={isSelected ? 'var(--time-clock-primary-color)' : 'dimmed'}>
        {t(tab.label)}
      </Text>
    </Box>
  )
}
