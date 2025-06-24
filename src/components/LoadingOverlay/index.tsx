import { LoadingOverlayProps, LoadingOverlay as MantineLoadingOverlay } from '@mantine/core'

export function LoadingOverlay({ visible = true, ...props }: LoadingOverlayProps) {
  return (
    <MantineLoadingOverlay
      visible={visible}
      zIndex={10000}
      overlayProps={{ blur: 3, backgroundOpacity: 0.1 }}
      {...props}
      h="100dvh"
    />
  )
}
