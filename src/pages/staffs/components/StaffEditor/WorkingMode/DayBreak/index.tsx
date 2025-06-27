import { WEEKDAYS_SHORT_VI } from '@/configs/constant'
import useTranslation from '@/hooks/useTranslation'
import { Button, Group, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import Header from './Header'
import Item from './Item'

type DayBreakProps = {
  isWorksShifts: boolean
}

export default function DayBreak({ isWorksShifts }: DayBreakProps) {
  const t = useTranslation()
  const [items, setItems] = useState<number[]>([])
  const weekDays = WEEKDAYS_SHORT_VI.map((day, idx) => ({ label: day, value: idx.toString() }))

  const handleAdd = () => {
    const newId = Date.now()
    setItems((prev) => [...prev, newId])
  }

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item !== id))
  }

  if (isWorksShifts) {
    return <></>
  }

  return (
    <Stack gap={0}>
      <Text fw="bold" fz={16}>
        {t('Day break')}
      </Text>
      <Group justify="flex-start" mt={6}>
        <Button onClick={handleAdd}>{t('Add staff break')}</Button>
      </Group>
      {items.length > 0 && <Header />}
      {items.map((id) => (
        <Item key={id} weekDays={weekDays} onRemove={() => handleRemove(id)} />
      ))}
    </Stack>
  )
}
