import { ActionIcon, Image } from '@mantine/core'

type ClosePopupProps = {
  isDisplay: boolean
  onClick: () => void
}

export default function ClosePopup({ isDisplay, onClick }: ClosePopupProps) {
  if (!isDisplay) {
    return <></>
  }

  return (
    <ActionIcon
      variant="transparent"
      style={{
        position: 'absolute',
        bottom: '10dvh',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
      }}
      onClick={onClick}
    >
      <Image src="/imgs/time-clock/close.svg" />
    </ActionIcon>
  )
}
