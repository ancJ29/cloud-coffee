import {
  checkInByUserSchema,
  checkOutByUserSchema,
  getShiftsByAdminSchema,
  getShiftsSchema,
  RequestAction,
  updateShiftSchema,
} from '@/types'
import { z } from 'zod'
import callApi from '../api'
import { loadAll } from '../data-loader'

type GetShiftsRequest = z.infer<typeof getShiftsSchema.request>['payload']
export type Shift = z.infer<typeof getShiftsSchema.response>['data'][0]
export async function getAllShifts(payload: GetShiftsRequest) {
  return await loadAll({
    action: RequestAction.GET_SHIFTS,
    payload,
    schema: getShiftsSchema,
  })
}

type CheckInByUserRequest = z.infer<typeof checkInByUserSchema.request>['payload']
export async function checkInByUser(payload: CheckInByUserRequest) {
  return await callApi({
    action: RequestAction.CHECK_IN_BY_USER,
    payload,
    schema: checkInByUserSchema,
  })
}

type CheckOutByUserRequest = z.infer<typeof checkOutByUserSchema.request>['payload']
export async function checkOutByUser(payload: CheckOutByUserRequest) {
  return await callApi({
    action: RequestAction.CHECK_OUT_BY_USER,
    payload,
    schema: checkOutByUserSchema,
  })
}

export type UpdateShiftRequest = z.infer<typeof updateShiftSchema.request>['payload']
export async function updateShift(payload: UpdateShiftRequest) {
  return await callApi({
    action: RequestAction.UPDATE_SHIFT,
    payload,
    schema: updateShiftSchema,
  })
}

type GetShiftsByAdminRequest = z.infer<typeof getShiftsByAdminSchema.request>['payload']
export async function getAllShiftsByAdmin(payload: GetShiftsByAdminRequest) {
  return await loadAll({
    action: RequestAction.GET_SHIFTS_BY_ADMIN,
    payload,
    schema: getShiftsByAdminSchema,
  })
}
