import { ActionIcon, Image } from '@mantine/core'

type ClosePopupProps = {
  zIndex: number
  onClick: () => void
}

export default function ClosePopup({ zIndex, onClick }: ClosePopupProps) {
  return (
    <ActionIcon
      variant="transparent"
      style={{
        position: 'absolute',
        bottom: '10dvh',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex,
      }}
      onClick={onClick}
    >
      <Image src="/imgs/time-clock/close.svg" />
    </ActionIcon>
  )
}
