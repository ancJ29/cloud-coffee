import { pushNotification } from '@/configs/notifications'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { User, getAllUsers, updateUser } from '@/services/domain'
import useUserStore from '@/stores/user.store'
import { NotificationType } from '@/types'
import { ONE_SECOND } from '@/utils'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StaffsView from './components/StaffsView'
import DeleteStaffForm from './components/StaffsView/DeleteStaffForm'
import DeleteSuccessMessage from './components/StaffsView/DeleteSuccessMessage'

export default function Staffs() {
  const t = useTranslation()
  const navigate = useNavigate()
  const { load } = useUserStore()
  const [currents, setCurrents] = useState<User[]>([])
  const [updates, setUpdates] = useState<User[]>([])
  const [keyword, setKeyword] = useState('')

  const getData = async () => {
    const res = await getAllUsers()
    if (res) {
      setCurrents(res)
      setUpdates(res)
    }
  }
  useMount(getData)

  const handleChangeKeyword = useCallback(
    (value?: string) => {
      setKeyword(value || '')
      setUpdates(
        currents.filter((el) => el.name.toLowerCase().includes(value?.toLowerCase() || '')),
      )
    },
    [currents],
  )

  const handleEditStaff = useCallback(
    (user: User) => {
      navigate(`/staffs/edit?id=${user.id}`)
    },
    [navigate],
  )

  const handleAddStaff = useCallback(() => {
    navigate('/staffs/add')
  }, [navigate])

  const updateStaff = useCallback(
    (user: User) => {
      updateUser({ ...user, enabled: false }).then((res) => {
        const success = res?.success
        if (success) {
          modals.open({
            title: t('Delete staff successfully'),
            centered: true,
            size: 'md',
            children: <DeleteSuccessMessage />,
          })
          load(true)
          setTimeout(() => modals.closeAll(), 5 * ONE_SECOND)
        } else {
          pushNotification({ t, type: NotificationType.ERROR })
        }
      })
    },
    [load, t],
  )

  const handleDeleteStaff = useCallback(
    (user: User) => {
      modals.open({
        title: `${t('Delete staff')} ${user.name}`,
        centered: true,
        size: 'md',
        children: (
          <DeleteStaffForm onConfirm={() => updateStaff(user)} onCancel={() => modals.closeAll()} />
        ),
      })
    },
    [t, updateStaff],
  )

  return (
    <StaffsView
      users={updates}
      keyword={keyword}
      onAddStaff={handleAddStaff}
      onEditStaff={handleEditStaff}
      onDeleteStaff={handleDeleteStaff}
      onChangeKeyWord={handleChangeKeyword}
    />
  )
}
