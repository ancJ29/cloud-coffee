import {
  checkInByUserSchema,
  checkOutByUserSchema,
  DelayProps,
  getAttendanceLogsByAdminSchema,
  getAttendanceLogsSchema,
  RequestAction,
  updateAttendanceLogSchema,
} from '@/types'
import { z } from 'zod'
import callApi from '../api'
import { loadAll } from '../data-loader'

type GetAttendanceLogsRequest = z.infer<typeof getAttendanceLogsSchema.request>['payload']
export type AttendanceLog = z.infer<typeof getAttendanceLogsSchema.response>['data'][0]
export async function getAllAttendanceLogs(payload: GetAttendanceLogsRequest) {
  return await loadAll({
    action: RequestAction.GET_ATTENDANCE_LOGS,
    payload,
    schema: getAttendanceLogsSchema,
  })
}

type CheckInByUserRequest = z.infer<typeof checkInByUserSchema.request>['payload'] & DelayProps
export async function checkInByUser(payload: CheckInByUserRequest) {
  return await callApi({
    action: RequestAction.CHECK_IN_BY_USER,
    payload,
    schema: checkInByUserSchema,
    delay: payload.delay,
  })
}

type CheckOutByUserRequest = z.infer<typeof checkOutByUserSchema.request>['payload'] & DelayProps
export async function checkOutByUser(payload: CheckOutByUserRequest) {
  return await callApi({
    action: RequestAction.CHECK_OUT_BY_USER,
    payload,
    schema: checkOutByUserSchema,
    delay: payload.delay,
  })
}

export type UpdateAttendanceLogRequest = z.infer<
  typeof updateAttendanceLogSchema.request
>['payload']
export async function updateAttendanceLog(payload: UpdateAttendanceLogRequest) {
  return await callApi({
    action: RequestAction.UPDATE_ATTENDANCE_LOG,
    payload,
    schema: updateAttendanceLogSchema,
  })
}

type GetAttendanceLogsByAdminRequest = z.infer<
  typeof getAttendanceLogsByAdminSchema.request
>['payload'] &
  DelayProps
export async function getAllAttendanceLogsByAdmin(payload: GetAttendanceLogsByAdminRequest) {
  return await loadAll({
    action: RequestAction.GET_ATTENDANCE_LOGS_BY_ADMIN,
    payload,
    schema: getAttendanceLogsByAdminSchema,
    delay: payload.delay,
  })
}
