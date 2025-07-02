import { IS_DEV } from '@/configs/constant'
import useMount from '@/hooks/useMount'
import {
  AttendanceLog,
  getAllAttendanceLogsByAdmin,
  getAllUsersByAdmin,
  getAllVenuesByAdmin,
  getClientByDomain,
  Venue,
} from '@/services/domain'
import { startOfDay } from '@/utils'
import { useCallback, useState } from 'react'
import { AttendanceStatus, UserAttendanceStatus } from './_configs'
import WorkingStatusView from './components/WorkingStatusView'

export default function WorkingStatus() {
  const domain = IS_DEV ? import.meta.env.VITE_DOMAIN : window.location.hostname
  const [currents, setCurrents] = useState<UserAttendanceStatus[]>([])
  const [updates, setUpdates] = useState<UserAttendanceStatus[]>([])
  const [keyword, setKeyword] = useState<string | undefined>('')
  const [venues, setVenues] = useState<Venue[]>([])

  const getData = useCallback(async () => {
    const clientId = await getClientByDomain({ domain }).then((res) => res?.id)

    if (clientId) {
      const now = Date.now()
      const [users, venues, attendanceLogs] = await Promise.all([
        getAllUsersByAdmin({ clientId }),
        getAllVenuesByAdmin({ clientId }),
        getAllAttendanceLogsByAdmin({
          clientId,
          start: startOfDay(now),
          end: now,
          delay: 600,
        }),
      ])

      setVenues(venues)

      const attendanceLogsByUserId = attendanceLogs.reduce<Record<string, AttendanceLog[]>>(
        (acc, attendanceLog) => {
          if (!acc[attendanceLog.userId]) {
            acc[attendanceLog.userId] = []
          }
          acc[attendanceLog.userId].push(attendanceLog)
          return acc
        },
        {},
      )

      const userAttendanceStatusList: UserAttendanceStatus[] = users.map((user) => {
        const userAttendanceLogs = attendanceLogsByUserId[user.id] || []

        let attendanceStatus = AttendanceStatus.NOT_WORKING
        if (userAttendanceLogs.length > 0) {
          const isWorking = userAttendanceLogs.some((userAttendanceLog) => !userAttendanceLog.end)
          attendanceStatus = isWorking ? AttendanceStatus.WORKING : AttendanceStatus.DONE
        }

        return { ...user, attendanceStatus }
      })

      setCurrents(userAttendanceStatusList)
      setUpdates(userAttendanceStatusList)
    }
  }, [domain])
  useMount(getData)

  const handleChangeKeyword = useCallback(
    (keyword?: string) => {
      setKeyword(keyword)

      const userAttendanceStatusList = currents.filter((user) =>
        user.name.toLowerCase().includes((keyword || '').toLowerCase()),
      )
      setUpdates(userAttendanceStatusList)
    },
    [currents],
  )

  return (
    <WorkingStatusView
      venues={venues}
      users={currents}
      userAttendanceStatusList={updates}
      keyword={keyword}
      onChangeKeyword={handleChangeKeyword}
    />
  )
}
