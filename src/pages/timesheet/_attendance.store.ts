import { pushNotification } from '@/configs/notifications'
import { AttendanceLog, getAllAttendanceLogs, updateAttendanceLog } from '@/services/domain'
import useUserStore from '@/stores/user.store'
import { DatesRangeValue, DateValue, NotificationType } from '@/types'
import { cloneDeep, createStore, endOfDay, startOfDay } from '@/utils'

type State = {
  currents: Record<string, AttendanceLog[]>
  updates: Record<string, AttendanceLog[]>
  startDate: Date
  endDate: Date
  roleId: string | null
  venueId: string | null
  keyword: string
  updatedAttendanceLog: Record<string, AttendanceLog>
}

const defaultState = {
  currents: {},
  updates: {},
  startDate: new Date(startOfDay(Date.now())),
  endDate: new Date(endOfDay(Date.now())),
  roleId: null,
  venueId: null,
  keyword: '',
  updatedAttendanceLog: {},
}

enum ActionType {
  INIT_DATA = 'INIT_DATA',
  CHANGE_DATE = 'CHANGE_DATE',
  CHANGE_ROLE_ID = 'CHANGE_ROLE_ID',
  CHANGE_VENUE_ID = 'CHANGE_VENUE_ID',
  CHANGE_KEYWORD = 'CHANGE_KEYWORD',
  CHANGE_CHECK_IN_TIME = 'CHANGE_CHECK_IN_TIME',
  CHANGE_CHECK_OUT_TIME = 'CHANGE_CHECK_OUT_TIME',
}

type Action = {
  type: ActionType
  attendanceLogs?: AttendanceLog[]
  startDate?: DateValue
  endDate?: DateValue
  roleId?: string | null
  venueId?: string | null
  keyword?: string
  checkInTime?: string
  checkOutTime?: string
  userId?: string
  attendanceLogId?: string
}

const { dispatch, ...store } = createStore<State, Action>(reducer, {
  ...defaultState,
})

export default {
  ...store,
  async initData() {
    const state = store.getSnapshot()

    const attendanceLogs = await getAllAttendanceLogs({
      start: state.startDate.getTime(),
      end: state.endDate.getTime(),
    })
    dispatch({ type: ActionType.INIT_DATA, attendanceLogs })
  },
  async changeDate(value: DatesRangeValue) {
    const [start, end] = value
    if (!start || !end) return

    const startDate = new Date(startOfDay(new Date(start || 0).getTime()))
    const endDate = new Date(endOfDay(new Date(end || 0).getTime()))

    const attendanceLogs = await getAllAttendanceLogs({
      start: startDate.getTime(),
      end: endDate.getTime(),
    })

    dispatch({
      type: ActionType.CHANGE_DATE,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      attendanceLogs,
    })
  },
  changeRoleId(roleId: string | null) {
    dispatch({ type: ActionType.CHANGE_ROLE_ID, roleId })
  },
  changeVenueId(venueId: string | null) {
    dispatch({ type: ActionType.CHANGE_VENUE_ID, venueId })
  },
  changeKeyword(keyword?: string) {
    dispatch({ type: ActionType.CHANGE_KEYWORD, keyword })
  },
  changeCheckInTime(userId: string, attendanceLogId: string, checkInTime: string) {
    dispatch({ type: ActionType.CHANGE_CHECK_IN_TIME, userId, attendanceLogId, checkInTime })
  },
  changeCheckOutTime(userId: string, attendanceLogId: string, checkOutTime: string) {
    dispatch({ type: ActionType.CHANGE_CHECK_OUT_TIME, userId, attendanceLogId, checkOutTime })
  },
  save(t: (key: string) => string) {
    const state = store.getSnapshot()
    const promises = Object.values(state.updatedAttendanceLog).map((attendanceLog) =>
      updateAttendanceLog(attendanceLog),
    )
    Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          pushNotification({ t })
        }, 500)
      })
      .catch((error) => {
        pushNotification({ type: NotificationType.ERROR, message: error.message })
      })
  },
}

function reducer(action: Action, state: State): State {
  switch (action.type) {
    case ActionType.INIT_DATA:
      if (action.attendanceLogs !== undefined) {
        const currents = initAttendanceLogsByUserId(action.attendanceLogs)
        return {
          ...state,
          currents,
          updates: cloneDeep(currents),
        }
      }
      break
    case ActionType.CHANGE_DATE:
      if (action.attendanceLogs !== undefined && action.startDate && action.endDate) {
        const currents = initAttendanceLogsByUserId(action.attendanceLogs)
        return {
          ...state,
          currents,
          updates: cloneDeep(currents),
          startDate: new Date(action.startDate),
          endDate: new Date(action.endDate),
          roleId: null,
          venueId: null,
          keyword: '',
        }
      }
      break
    case ActionType.CHANGE_ROLE_ID:
      if (action.roleId !== undefined) {
        const updates = _filterAttendanceLogs(
          state.currents,
          action.roleId,
          state.venueId,
          state.keyword,
        )
        return {
          ...state,
          roleId: action.roleId,
          updates,
        }
      }
      break
    case ActionType.CHANGE_VENUE_ID:
      if (action.venueId !== undefined) {
        const updates = _filterAttendanceLogs(
          state.currents,
          state.roleId,
          action.venueId,
          state.keyword,
        )
        return {
          ...state,
          venueId: action.venueId,
          updates,
        }
      }
      break
    case ActionType.CHANGE_KEYWORD: {
      const updates = _filterAttendanceLogs(
        state.currents,
        state.roleId,
        state.venueId,
        action.keyword,
      )
      return {
        ...state,
        keyword: action.keyword || '',
        updates,
      }
    }
    case ActionType.CHANGE_CHECK_IN_TIME:
      if (
        action.userId !== undefined &&
        action.attendanceLogId !== undefined &&
        action.checkInTime !== undefined
      ) {
        const updates = {
          ...state.updates,
          [action.userId]: state.updates[action.userId].map((attendanceLog) => {
            if (attendanceLog.id === action.attendanceLogId) {
              const [hh, mm] = action.checkInTime?.split(':').map(Number) ?? [0, 0]
              const date = new Date(attendanceLog.start)
              date.setHours(hh, mm, 0, 0)
              state.updatedAttendanceLog[attendanceLog.id] = attendanceLog
              return { ...attendanceLog, start: date.getTime() }
            }
            return attendanceLog
          }),
        }
        return { ...state, updates }
      }
      break
    case ActionType.CHANGE_CHECK_OUT_TIME:
      if (
        action.userId !== undefined &&
        action.attendanceLogId !== undefined &&
        action.checkOutTime !== undefined
      ) {
        const updates = {
          ...state.updates,
          [action.userId]: state.updates[action.userId].map((attendanceLog) => {
            if (attendanceLog.id === action.attendanceLogId) {
              const [hh, mm] = action.checkOutTime?.split(':').map(Number) ?? [0, 0]
              const date = new Date(attendanceLog.start)
              date.setHours(hh, mm, 0, 0)
              if (date.getTime() < attendanceLog.start) {
                date.setDate(date.getDate() + 1)
              }

              const updatedAttendanceLog = { ...attendanceLog, end: date.getTime() }
              state.updatedAttendanceLog[attendanceLog.id] = updatedAttendanceLog

              return updatedAttendanceLog
            }
            return attendanceLog
          }),
        }
        return { ...state, updates }
      }
      break
  }
  return state
}

function initAttendanceLogsByUserId(attendanceLogs: AttendanceLog[]) {
  const attendanceLogsByUserId: Record<string, AttendanceLog[]> = {}

  attendanceLogs.map((attendanceLog) => {
    const attendanceLogs = attendanceLogsByUserId[attendanceLog.userId] || []
    attendanceLogsByUserId[attendanceLog.userId] = [...attendanceLogs, attendanceLog]
  })

  return attendanceLogsByUserId
}

function _filterAttendanceLogs(
  attendanceLogsByUserId: Record<string, AttendanceLog[]>,
  roleId: string | null,
  venueId: string | null,
  keyword?: string,
): Record<string, AttendanceLog[]> {
  const { users } = useUserStore.getState()
  let updates = attendanceLogsByUserId

  if (roleId !== null) {
    updates = Object.fromEntries(
      Object.entries(updates).filter(([userId]) => users.get(userId)?.roleId === roleId),
    )
  }

  if (venueId !== null) {
    updates = Object.fromEntries(
      Object.entries(updates).map(([userId, attendanceLogs]) => [
        userId,
        attendanceLogs.filter((attendanceLog) => attendanceLog.venueId === venueId),
      ]),
    )
  }

  if (keyword !== undefined) {
    updates = Object.fromEntries(
      Object.entries(updates).filter(([userId]) =>
        users.get(userId)?.name.toLowerCase().includes(keyword.toLowerCase()),
      ),
    )
  }

  return updates
}
