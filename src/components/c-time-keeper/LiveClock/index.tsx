import { formatTime, ONE_SECOND } from '@/utils'
import { Text, TextProps } from '@mantine/core'
import { useEffect, useState } from 'react'

interface LiveClockProps extends TextProps {
  format?: string
}

export default function LiveClock({ format = 'hh:mm:ss A', ...props }: LiveClockProps) {
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, ONE_SECOND)
    return () => clearInterval(interval)
  }, [])

  return (
    <Text fz={28} fw="bold" style={{ letterSpacing: 3 }} {...props}>
      {formatTime(currentTime, format)}
    </Text>
  )
}
