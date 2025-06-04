import { Stack } from '@mantine/core'
import { isBrowser } from 'react-device-detect'
import { Tabs, tabs } from '../../_configs'
import ClockIn from '../ClockIn'
import MobileOnlyWarning from '../MobileOnlyWarning'
import MyTimesheet from '../MyTimesheet'
import TabItem from '../TabItem'
import TimeOffCenter from '../TimeOffCenter'
import classes from './TimeClockView.module.scss'

type TimeClockViewProps = {
  userId: string
  selectedTab: Tabs
  onChangeSelectedTab: (tab: Tabs) => void
}

export default function TimeClockView({
  userId,
  selectedTab,
  onChangeSelectedTab,
}: TimeClockViewProps) {
  if (isBrowser) {
    return <MobileOnlyWarning />
  }

  return (
    <Stack className={classes.container}>
      <div className={classes.content}>
        {selectedTab === Tabs.TIME_CLOCK && <ClockIn userId={userId} />}
        {selectedTab === Tabs.MY_TIMESHEET && <MyTimesheet />}
        {selectedTab === Tabs.TIME_OFF_CENTER && <TimeOffCenter />}
      </div>

      <div className={classes.tabBar}>
        {tabs.map((tab, idx) => (
          <TabItem
            key={idx}
            tab={tab}
            isSelected={tab.label === selectedTab}
            onClick={() => onChangeSelectedTab(tab.label)}
          />
        ))}
      </div>
    </Stack>
  )
}
