import { formatTime, ONE_SECOND } from '@/utils'
import { Text, TextProps } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function LiveClock(props: TextProps) {
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, ONE_SECOND)
    return () => clearInterval(interval)
  }, [])

  return (
    <Text fz={28} fw="bold" style={{ letterSpacing: 3 }} {...props}>
      {formatTime(currentTime, 'hh:mm')}:
      <Text fz={20} fw={500} span>
        {formatTime(currentTime, 'ss A')}
      </Text>
    </Text>
  )
}
