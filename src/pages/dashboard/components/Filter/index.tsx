import AutocompleteForFilterData from '@/components/c-time-keeper/AutocompleteForFilterData'
import useTranslation from '@/hooks/useTranslation'
import useUserStore from '@/stores/user.store'
import { unique } from '@/utils'

export type FilterProps = {
  keyword?: string
  onChangeKeyword: (keyword?: string) => void
}

export default function Filter({ keyword, onChangeKeyword }: FilterProps) {
  const t = useTranslation()
  const { users } = useUserStore()

  return (
    <AutocompleteForFilterData
      key={keyword}
      label={t('Name')}
      w="100%"
      data={unique(Array.from(users.values()).map((el) => el.name))}
      defaultValue={keyword}
      onReload={onChangeKeyword}
      mb={20}
    />
  )
}
