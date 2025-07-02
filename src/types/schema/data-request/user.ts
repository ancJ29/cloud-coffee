import { z } from 'zod'
import {
  booleanSchema,
  getSchema,
  listResponse,
  nullishBooleanSchema,
  nullishStringSchema,
  optionalStringSchema,
  stringSchema,
} from '../base'
import { userMemoSchema } from '../configs'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getUsersSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_USERS),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      email: nullishStringSchema,
      avatar: nullishStringSchema,
      roleId: stringSchema,
      workShiftId: nullishStringSchema,
      clientId: stringSchema,
      enabled: nullishBooleanSchema,
      phone: nullishStringSchema,
      publicId: stringSchema,
      memo: userMemoSchema,
    }),
  ),
})

export const getUsersByAdminSchema = _typeBuilder({
  action: z.literal(RequestAction.GET_USERS_BY_ADMIN),
  payload: getSchema.extend({
    id: optionalStringSchema,
    publicId: optionalStringSchema,
    clientId: optionalStringSchema,
  }),
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      avatar: nullishStringSchema,
      clientId: stringSchema,
      publicId: stringSchema,
      role: z.object({
        id: stringSchema,
        name: stringSchema,
      }),
    }),
  ),
})

export const updateUserSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.UPDATE_USER),
  payload: z.object({
    id: stringSchema,
    name: stringSchema,
    email: nullishStringSchema,
    avatar: nullishStringSchema,
    roleId: stringSchema,
    workShiftId: nullishStringSchema,
    clientId: stringSchema,
    enabled: booleanSchema,
    phone: nullishStringSchema,
    publicId: stringSchema,
    memo: userMemoSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const addUserSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.ADD_USER),
  payload: z.object({
    name: stringSchema,
    email: nullishStringSchema,
    avatar: nullishStringSchema,
    roleId: stringSchema,
    workShiftId: nullishStringSchema,
    phone: nullishStringSchema,
    publicId: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})
