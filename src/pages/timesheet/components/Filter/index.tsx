import {
  AutocompleteForFilterData,
  DateSelect,
  FilterWrapper,
  SaveButton,
  Select,
} from '@/components'
import useTranslation from '@/hooks/useTranslation'
import useUserStore from '@/stores/user.store'
import { DatesRangeValue, MantineWidth, OptionProps } from '@/types'
import { unique } from '@/utils'
import { useCallback, useSyncExternalStore } from 'react'
import store from '../../_attendance.store'

const w: MantineWidth = { base: '100%', sm: '15vw' }

export type FilterProps = {
  roleOptions: OptionProps[]
  venueOptions: OptionProps[]
}

export default function Filter({ roleOptions, venueOptions }: FilterProps) {
  const t = useTranslation()
  const { users } = useUserStore()
  const { startDate, endDate, roleId, venueId, keyword } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
  )

  const onChangeDate = useCallback((value: DatesRangeValue) => {
    store.changeDate(value)
  }, [])

  return (
    <FilterWrapper>
      <AutocompleteForFilterData
        key={keyword}
        label={t('Name')}
        w={w}
        data={unique(Array.from(users.values()).map((el) => el.name))}
        defaultValue={keyword}
        onReload={store.changeKeyword}
      />
      <Select
        value={roleId}
        label={t('Role')}
        w={w}
        options={roleOptions}
        onChange={store.changeRoleId}
      />
      <Select
        value={venueId}
        label={t('Venue')}
        w={w}
        options={venueOptions}
        onChange={store.changeVenueId}
      />
      <DateSelect
        label={t('Date')}
        w={{ base: '100%', sm: '16vw' }}
        dateValue={[startDate, endDate]}
        onChangeDateValue={onChangeDate}
      />
      <SaveButton onClick={() => store.save(t)} />
    </FilterWrapper>
  )
}
