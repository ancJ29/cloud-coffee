import { BackgroundImage } from '@mantine/core'

type ServiceWrapperProps = {
  children: React.ReactNode
}

export default function ServiceWrapper({ children }: ServiceWrapperProps) {
  return (
    <BackgroundImage
      src="/imgs/work-entry/bg.png"
      h="100dvh"
      w="100vw"
      radius={0}
      style={{ overflow: 'auto' }}
    >
      {children}
    </BackgroundImage>
  )
}
