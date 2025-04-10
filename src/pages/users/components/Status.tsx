import Badge from '@/components/common/Badge'
import useTranslation from '@/hooks/useTranslation'

type StatusProps = {
  enabled?: boolean | null
}

export default function Status({ enabled = false }: StatusProps) {
  const t = useTranslation()

  return (
    <Badge color={enabled ? 'var(--success)' : 'var(--error)'} size="sm">
      {enabled ? t('Active') : t('Disable')}
    </Badge>
  )
}
