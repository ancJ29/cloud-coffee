import AutocompleteForFilterData from '@/components/c-time-keeper/AutocompleteForFilterData'
import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { Box } from '@mantine/core'
import Header from '../Header'
import StaffTable from '../StaffTable'
import classes from './StaffsView.module.scss'

type StaffsViewProps = {
  users: User[]
  keyword: string
  onEditStaff: (user: User) => void
  onAddStaff: () => void
  onChangeKeyWord: (value?: string) => void
}

export default function StaffsView({
  users,
  keyword,
  onAddStaff,
  onEditStaff,
  onChangeKeyWord,
}: StaffsViewProps) {
  const t = useTranslation()

  return (
    <Box className={classes.container}>
      <Header onAddStaff={onAddStaff} />

      <AutocompleteForFilterData
        key={keyword}
        label={t('Search by staff name')}
        data={users.map((user) => user.name)}
        defaultValue={keyword}
        onReload={onChangeKeyWord}
        mt={15}
      />

      <StaffTable users={users} onEditStaff={onEditStaff} />
    </Box>
  )
}
