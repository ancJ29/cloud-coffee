import { Box, Text } from '@mantine/core'
import { tabs, Tabs } from '../../_configs'
import ClockInView from '../ClockInView'
import MobileOnlyWarning from '../MobileOnlyWarning'
import classes from './TimeClockView.module.scss'

type TimeClockViewProps = {
  selectedTab: Tabs
  onChangeSelectedTab: (tab: Tabs) => void
}

export default function TimeClockView({ selectedTab, onChangeSelectedTab }: TimeClockViewProps) {
  return (
    <>
      <MobileOnlyWarning />
      <Box className={classes.container}>
        <div className={classes.tabBar}>
          {tabs.map((tab, idx) => (
            <Box key={idx} onClick={() => onChangeSelectedTab(tab.label)} className={classes.item}>
              <tab.icon color="var(--work-entry-bg)" size={24} />
              <Text className={classes.label}>{tab.label}</Text>
              <div
                className={`${classes.line} ${selectedTab === tab.label ? classes.active : ''}`}
              />
            </Box>
          ))}
        </div>
        <div className={classes.content}>
          {selectedTab === Tabs.TIME_CLOCK && <ClockInView />}
          {selectedTab === Tabs.TIME_AND_HOURS && <></>}
          {selectedTab === Tabs.TIME_OFF_CENTER && <></>}
        </div>
      </Box>
    </>
  )
}
