import { IconUserFilled } from '@tabler/icons-react'
import IconCorner from '../IconCorner'

export default function IconUser() {
  return (
    <div style={{ position: 'relative' }}>
      <IconUserFilled size={470} color="var(--user-icon-bg)" />
      <IconCorner position="top-left" top="8%" left="28%" />
      <IconCorner position="top-right" top="8%" right="28%" />
      <IconCorner position="bottom-left" bottom="calc(8% + 200px)" left="28%" />
      <IconCorner position="bottom-right" bottom="calc(8% + 200px)" right="28%" />
    </div>
  )
}
