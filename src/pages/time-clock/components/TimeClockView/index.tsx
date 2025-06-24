import { Stack } from '@mantine/core'
import { isBrowser } from 'react-device-detect'
import { tabs, Tabs } from '../../_configs'
import ClockIn from '../ClockIn'
import MyTimesheet from '../MyTimesheet'
import TimeOffCenter from '../TimeOffCenter'
import MobileOnlyWarning from './MobileOnlyWarning'
import TabItem from './TabItem'
import classes from './index.module.scss'

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
