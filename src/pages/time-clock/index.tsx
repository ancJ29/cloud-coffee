import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs } from './_configs'
import MissingUserId from './components/MissingUserId'
import TimeClockView from './components/TimeClockView'

export default function TimeClock() {
  const [searchParams] = useSearchParams()
  const publicId = searchParams.get('id')

  const [selectedTab, setSelectedTab] = useState(Tabs.TIME_CLOCK)

  if (!publicId) {
    return <MissingUserId />
  }

  return (
    <TimeClockView
      publicId={publicId}
      selectedTab={selectedTab}
      onChangeSelectedTab={setSelectedTab}
    />
  )
}
