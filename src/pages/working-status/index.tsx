import { IS_DEV } from '@/configs/constant'
import useMount from '@/hooks/useMount'
import {
  getAllShiftsByAdmin,
  getAllUsersByAdmin,
  getAllVenuesByAdmin,
  getClientByDomain,
  Shift,
  Venue,
} from '@/services/domain'
import { startOfDay } from '@/utils'
import { useCallback, useState } from 'react'
import { ShiftStatus, UserShiftStatus } from './_configs'
import WorkingStatusView from './components/WorkingStatusView'

export default function WorkingStatus() {
  const domain = IS_DEV ? import.meta.env.VITE_DOMAIN : window.location.hostname
  const [currents, setCurrents] = useState<UserShiftStatus[]>([])
  const [updates, setUpdates] = useState<UserShiftStatus[]>([])
  const [keyword, setKeyword] = useState<string | undefined>('')
  const [venues, setVenues] = useState<Venue[]>([])

  const getData = useCallback(async () => {
    const clientId = await getClientByDomain({ domain }).then((res) => res?.id)

    if (clientId) {
      const now = Date.now()
      const [users, venues, shifts] = await Promise.all([
        getAllUsersByAdmin({ clientId }),
        getAllVenuesByAdmin({ clientId }),
        getAllShiftsByAdmin({
          clientId,
          start: startOfDay(now),
          end: now,
        }),
      ])

      setVenues(venues)

      const shiftsByUserId = shifts.reduce<Record<string, Shift[]>>((acc, shift) => {
        if (!acc[shift.userId]) {
          acc[shift.userId] = []
        }
        acc[shift.userId].push(shift)
        return acc
      }, {})

      const userShiftStatusList: UserShiftStatus[] = users.map((user) => {
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
    }
  }, [domain])
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
      venues={venues}
      userShiftStatusList={updates}
      keyword={keyword}
      onChangeKeyword={handleChangeKeyword}
    />
  )
}
