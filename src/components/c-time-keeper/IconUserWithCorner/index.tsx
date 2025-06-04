import useWindowResize from '@/hooks/useWindowResize'
import { IconUserFilled } from '@tabler/icons-react'
import IconCorner from '../IconCorner'

export default function IconUserWithCorner() {
  const isMobileScreen = useWindowResize()

  return (
    <div style={{ position: 'relative' }}>
      <IconUserFilled size={isMobileScreen ? 390 : 470} color="var(--user-icon-bg)" />
      <IconCorner position="top-left" top="8%" left="28%" />
      <IconCorner position="top-right" top="8%" right="28%" />
      <IconCorner
        position="bottom-left"
        bottom={`calc(8% + ${isMobileScreen ? '170px' : '200px'})`}
        left="28%"
      />
      <IconCorner
        position="bottom-right"
        bottom={`calc(8% + ${isMobileScreen ? '170px' : '200px'})`}
        right="28%"
      />
    </div>
  )
}
