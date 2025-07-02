import { z } from 'zod'
import {
  booleanSchema,
  getSchema,
  listResponse,
  nullishNumberSchema,
  nullishStringSchema,
  numberSchema,
  optionalNumberSchema,
  optionalStringSchema,
  stringSchema,
} from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const checkInByUserSchema = _typeBuilder({
  action: z.literal(RequestAction.CHECK_IN_BY_USER),
  payload: z.object({
    clientId: stringSchema,
    userId: stringSchema,
    venueId: optionalStringSchema,
    startImageUrl: optionalStringSchema,
    longitude: optionalNumberSchema,
    latitude: optionalNumberSchema,
  }),
  response: z.object({
    success: booleanSchema,
    message: optionalStringSchema,
  }),
})

export const checkOutByUserSchema = _typeBuilder({
  action: z.literal(RequestAction.CHECK_OUT_BY_USER),
  payload: z.object({
    clientId: stringSchema,
    userId: stringSchema,
    endImageUrl: optionalStringSchema,
    longitude: optionalNumberSchema,
    latitude: optionalNumberSchema,
  }),
  response: z.object({
    success: booleanSchema,
    message: optionalStringSchema,
  }),
})

export const getAttendanceLogsSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_ATTENDANCE_LOGS),
  payload: getSchema.extend({
    start: numberSchema,
    end: numberSchema,
  }),
  response: listResponse(
    z.object({
      id: stringSchema,
      userId: stringSchema,
      venueId: stringSchema,
      start: numberSchema,
      end: nullishNumberSchema,
      startImageUrl: nullishStringSchema,
      endImageUrl: nullishStringSchema,
    }),
  ),
})

export const updateAttendanceLogSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.UPDATE_ATTENDANCE_LOG),
  payload: z.object({
    id: stringSchema,
    start: numberSchema,
    end: nullishNumberSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const getAttendanceLogsByAdminSchema = _typeBuilder({
  action: z.literal(RequestAction.GET_ATTENDANCE_LOGS_BY_ADMIN),
  payload: getSchema.extend({
    start: numberSchema,
    end: optionalNumberSchema,
    userId: optionalStringSchema,
    clientId: stringSchema,
  }),
  response: listResponse(
    z.object({
      id: stringSchema,
      userId: stringSchema,
      venueId: stringSchema,
      start: numberSchema,
      end: nullishNumberSchema,
      startImageUrl: nullishStringSchema,
      endImageUrl: nullishStringSchema,
    }),
  ),
})
