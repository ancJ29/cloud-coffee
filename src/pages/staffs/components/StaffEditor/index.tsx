import useTranslation from '@/hooks/useTranslation'
import { Tabs, Text } from '@mantine/core'
import { tabs, Tabs as TabsEnum, UserForm } from '../../_configs'
import StaffEditorWrapper from '../StaffEditor/Wrapper'
import Wrapper from '../Wrapper'
import classes from './index.module.scss'

type StaffEditorProps = {
  title: string
} & UserForm

export default function StaffEditor({ title, ...props }: StaffEditorProps) {
  const t = useTranslation()

  return (
    <Wrapper>
      <Text fz={28} fw="bold">
        {t(title)}
      </Text>
      <Tabs defaultValue={TabsEnum.BASIC_INFORMATION} variant="outline" radius="md">
        <Tabs.List grow justify="space-between" className={classes.tabList}>
          {tabs.map((tab, idx) => (
            <Tabs.Tab key={idx} value={tab.label}>
              {t(tab.label)}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab, idx) => (
          <Tabs.Panel key={idx} value={tab.label} pt={25}>
            <StaffEditorWrapper title={t(tab.label)}>
              <tab.content {...props} />
            </StaffEditorWrapper>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Wrapper>
  )
}
