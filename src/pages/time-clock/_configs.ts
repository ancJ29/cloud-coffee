import { IconCarFilled, IconClockFilled, IconPuzzleFilled } from '@tabler/icons-react'

export enum Tabs {
  TIME_CLOCK = 'Time clock',
  TIME_AND_HOURS = 'Time and hours',
  TIME_OFF_CENTER = 'Time off center',
}

export const tabs = [
  { label: Tabs.TIME_CLOCK, icon: IconClockFilled },
  { label: Tabs.TIME_AND_HOURS, icon: IconPuzzleFilled },
  { label: Tabs.TIME_OFF_CENTER, icon: IconCarFilled },
]
