import { Box, Text } from '@mantine/core'
import { tabs, Tabs } from '../../_configs'
import CheckInView, { CheckInViewProps } from '../CheckInView'
import MobileOnlyWarning from '../MobileOnlyWarning'
import TimeAndHoursView from '../TimeAndHoursView'
import TimeOffCenterView from '../TimeOffCenterView'
import classes from './TimeClockView.module.scss'

type TimeClockViewProps = {
  selectedTab: Tabs
  onChangeSelectedTab: (tab: Tabs) => void
} & CheckInViewProps

export default function TimeClockView({
  selectedTab,
  onChangeSelectedTab,
  ...props
}: TimeClockViewProps) {
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
          {selectedTab === Tabs.TIME_CLOCK && <CheckInView {...props} />}
          {selectedTab === Tabs.TIME_AND_HOURS && <TimeAndHoursView />}
          {selectedTab === Tabs.TIME_OFF_CENTER && <TimeOffCenterView />}
        </div>
      </Box>
    </>
  )
}
