import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs } from './_configs'
import MissingUserId from './components/MissingUserId'
import TimeClockView from './components/TimeClockView'

export default function TimeClock() {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const [selectedTab, setSelectedTab] = useState(Tabs.TIME_CLOCK)

  if (!userId) {
    return <MissingUserId />
  }

  return (
    <TimeClockView userId={userId} selectedTab={selectedTab} onChangeSelectedTab={setSelectedTab} />
  )
}
