import useMount from '@/hooks/useMount'
import { getAllShifts, Shift } from '@/services/domain'
import useUserStore from '@/stores/user.store'
import { startOfDay } from '@/utils'
import { useCallback, useState } from 'react'
import { ShiftStatus, UserShiftStatus } from './_configs'
import WorkingStatusView from './components/WorkingStatusView'

export default function WorkingStatus() {
  const { users } = useUserStore()
  const [currents, setCurrents] = useState<UserShiftStatus[]>([])
  const [updates, setUpdates] = useState<UserShiftStatus[]>([])
  const [keyword, setKeyword] = useState<string | undefined>('')

  const getData = useCallback(async () => {
    const now = Date.now()
    const shifts = await getAllShifts({
      start: startOfDay(now),
      end: now,
    })

    const shiftsByUserId = shifts.reduce<Record<string, Shift[]>>((acc, shift) => {
      if (!acc[shift.userId]) {
        acc[shift.userId] = []
      }
      acc[shift.userId].push(shift)
      return acc
    }, {})

    const userShiftStatusList: UserShiftStatus[] = Array.from(users.values()).map((user) => {
      const userShifts = shiftsByUserId[user.id] || []

      let shiftStatus = ShiftStatus.NOT_WORKING
      if (userShifts.length > 0) {
        const isWorking = userShifts.some((shift) => !shift.end)
        shiftStatus = isWorking ? ShiftStatus.WORKING : ShiftStatus.DONE
      }

      return { ...user, shiftStatus }
    })

    setCurrents(userShiftStatusList)
    setUpdates(userShiftStatusList)
  }, [users])
  useMount(getData)

  const handleChangeKeyword = useCallback(
    (keyword?: string) => {
      setKeyword(keyword)

      const userShiftStatusList = currents.filter((user) =>
        user.name.toLowerCase().includes((keyword || '').toLowerCase()),
      )
      setUpdates(userShiftStatusList)
    },
    [currents],
  )

  return (
    <WorkingStatusView
      userShiftStatusList={updates}
      keyword={keyword}
      onChangeKeyword={handleChangeKeyword}
    />
  )
}
