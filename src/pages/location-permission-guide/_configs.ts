import { IconBrandAndroid, IconDeviceMobile } from '@tabler/icons-react'
import AndroidGuide from './components/AndroidGuide'
import IOSGuide from './components/IOSGuide'

export enum Tabs {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
}

export const tabs = [
  { label: Tabs.IOS, icon: IconDeviceMobile, content: IOSGuide },
  { label: Tabs.ANDROID, icon: IconBrandAndroid, content: AndroidGuide },
]
