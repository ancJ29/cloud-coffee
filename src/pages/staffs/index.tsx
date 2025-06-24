import { pushNotification } from '@/configs/notifications'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { User, getAllUsers, updateUser } from '@/services/domain'
import useUserStore from '@/stores/user.store'
import { NotificationType } from '@/types'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StaffsView from './components/StaffsView'

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

  const handleDeleteStaff = useCallback(
    (user: User) => {
      updateUser({ ...user, enabled: false }).then((res) => {
        const success = res?.success
        pushNotification({ t, type: success ? NotificationType.INFO : NotificationType.ERROR })
        load(true)
      })
    },
    [load, t],
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
