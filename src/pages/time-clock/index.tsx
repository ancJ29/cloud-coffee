import { useState } from 'react'
import { Tabs } from './_configs'
import TimeClockView from './components/TimeClockView'

export default function TimeClock() {
  const [selectedTab, setSelectedTab] = useState(Tabs.TIME_CLOCK)

  return <TimeClockView selectedTab={selectedTab} onChangeSelectedTab={setSelectedTab} />
}
