import { BackgroundImage } from '@mantine/core'

type WorkEntryLayoutProps = {
  children: React.ReactNode
}

export default function WorkEntryLayout({ children }: WorkEntryLayoutProps) {
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
