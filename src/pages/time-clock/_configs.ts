export enum Tabs {
  TIME_CLOCK = 'Time clock',
  MY_TIMESHEET = 'My timesheet',
  TIME_OFF_CENTER = 'Time off center',
}

export type TabProps = {
  label: Tabs
  icon: string
  iconWidth?: number
}

export const tabs: TabProps[] = [
  { label: Tabs.TIME_CLOCK, icon: 'time-clock' },
  { label: Tabs.MY_TIMESHEET, icon: 'my-timesheet', iconWidth: 26 },
  { label: Tabs.TIME_OFF_CENTER, icon: 'time-off-center' },
]
