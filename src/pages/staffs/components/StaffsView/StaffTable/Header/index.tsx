import useTranslation from '@/hooks/useTranslation'
import { Text } from '@mantine/core'

export default function Header() {
  const t = useTranslation()

  return (
    <div
      style={{
        padding: '10px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Text fz={16}>{t('Staff name')}</Text>
    </div>
  )
}
