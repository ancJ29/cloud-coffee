import useMount from '@/hooks/useMount'
import { User, getAllUsers } from '@/services/domain'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StaffsView from './components/StaffsView'

export default function Staffs() {
  const [currents, setCurrents] = useState<User[]>([])
  const [updates, setUpdates] = useState<User[]>([])
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

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

  return (
    <StaffsView
      users={updates}
      keyword={keyword}
      onAddStaff={handleAddStaff}
      onEditStaff={handleEditStaff}
      onChangeKeyWord={handleChangeKeyword}
    />
  )
}
