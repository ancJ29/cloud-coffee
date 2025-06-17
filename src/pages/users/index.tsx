import { showNotification } from '@/configs/notifications'
import useFilterData from '@/hooks/useFilterData'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import {
  addUser,
  AddUserRequest,
  getAllUsers,
  updateUser,
  UpdateUserRequest,
  User,
} from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import useUserStore from '@/stores/user.store'
import { modals } from '@mantine/modals'
import { useCallback, useMemo, useState } from 'react'
import { configs, defaultCondition, filter, FilterType } from './_configs'
import AddUserForm from './components/AddUserForm'
import EditUserForm from './components/EditUserForm'
import UserView from './components/UserView'

export default function Users() {
  const t = useTranslation()
  const { roles } = useRoleStore()
  const { salaryRules } = useSalaryRuleStore()
  const { load } = useUserStore()
  const [users, setUsers] = useState<User[]>([])
  const dataGridConfigs = useMemo(() => configs(t, roles, salaryRules), [roles, salaryRules, t])

  const getData = async () => {
    const res = await getAllUsers()
    res && setUsers(res)
  }
  useMount(getData)

  const dataLoader = useCallback(() => {
    return users
  }, [users])

  const {
    data,
    page,
    setPage,
    condition,
    keyword,
    names,
    reload,
    updateCondition,
    setCondition,
    filtered,
    reset,
  } = useFilterData<User, FilterType>({
    dataLoader,
    filter,
    defaultCondition,
  })

  const roleOptions = useMemo(
    () =>
      Array.from(roles.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [roles, t],
  )

  const salaryRuleOptions = useMemo(
    () =>
      Array.from(salaryRules.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [salaryRules, t],
  )

  const handleConfirmAddUser = useCallback(
    (values: AddUserRequest) => {
      addUser(values).then((res) => {
        const success = res?.success
        showNotification({ t, type: success ? 'info' : 'error' })
        load(true)
        getData()
      })
    },
    [load, t],
  )

  const handleAddUser = useCallback(
    (values?: AddUserRequest) => {
      modals.open({
        title: t('Add user'),
        centered: true,
        size: 'md',
        children: (
          <AddUserForm
            initValues={values}
            reOpen={handleAddUser}
            onConfirm={handleConfirmAddUser}
            roleOptions={roleOptions}
            salaryRuleOptions={salaryRuleOptions}
          />
        ),
      })
    },
    [handleConfirmAddUser, roleOptions, salaryRuleOptions, t],
  )

  const handleConfirmUpdateUser = useCallback(
    (values: UpdateUserRequest) => {
      updateUser(values).then((res) => {
        const success = res?.success
        showNotification({ t, type: success ? 'info' : 'error' })
        modals.closeAll()
        load(true)
        getData()
      })
    },
    [load, t],
  )

  const handleEditUser = useCallback(
    (user: User) => {
      modals.open({
        title: t('Update user'),
        centered: true,
        size: 'md',
        children: (
          <EditUserForm
            user={user}
            reOpen={handleEditUser}
            onConfirm={handleConfirmUpdateUser}
            roleOptions={roleOptions}
            salaryRuleOptions={salaryRuleOptions}
          />
        ),
      })
    },
    [handleConfirmUpdateUser, roleOptions, salaryRuleOptions, t],
  )

  return (
    <UserView
      key={roles.size}
      data={data}
      page={page}
      setPage={setPage}
      onAddUser={handleAddUser}
      onEditUser={handleEditUser}
      dataGridConfigs={dataGridConfigs}
      condition={condition}
      keyword={keyword}
      names={names}
      reload={reload}
      updateCondition={updateCondition}
      setCondition={setCondition}
      filtered={filtered}
      reset={reset}
      roleOptions={roleOptions}
    />
  )
}
