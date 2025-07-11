import { AutocompleteForFilterData } from '@/components'
import useTranslation from '@/hooks/useTranslation'
import { unique } from '@/utils'
import { UserAttendanceStatus } from '../../_configs'

export type FilterProps = {
  users: UserAttendanceStatus[]
  keyword?: string
  onChangeKeyword: (keyword?: string) => void
}

export default function Filter({ users, keyword, onChangeKeyword }: FilterProps) {
  const t = useTranslation()

  return (
    <AutocompleteForFilterData
      key={keyword}
      label={t('Staff name')}
      data={unique(users.map((el) => el.name))}
      defaultValue={keyword}
      onReload={onChangeKeyword}
    />
  )
}
