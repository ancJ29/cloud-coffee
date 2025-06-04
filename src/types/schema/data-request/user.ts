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
    z
      .object({
        id: stringSchema,
        name: stringSchema,
        username: nullishStringSchema,
        email: nullishStringSchema,
        avatar: nullishStringSchema,
        roleId: stringSchema,
        salaryRuleId: nullishStringSchema,
        clientId: stringSchema,
        enabled: nullishBooleanSchema,
      })
      .extend(userMemoSchema.shape),
  ),
})

export const getUsersByAdminSchema = _typeBuilder({
  action: z.literal(RequestAction.GET_USERS_BY_ADMIN),
  payload: getSchema.extend({
    id: optionalStringSchema,
    clientId: optionalStringSchema,
  }),
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      avatar: nullishStringSchema,
      clientId: stringSchema,
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
  payload: z
    .object({
      id: stringSchema,
      name: stringSchema,
      username: nullishStringSchema,
      email: nullishStringSchema,
      avatar: nullishStringSchema,
      roleId: stringSchema,
      salaryRuleId: nullishStringSchema,
      clientId: stringSchema,
      enabled: booleanSchema,
    })
    .extend(userMemoSchema.shape),
  response: z.object({
    success: booleanSchema,
  }),
})

export const addUserSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.ADD_USER),
  payload: z
    .object({
      name: stringSchema,
      email: nullishStringSchema,
      avatar: nullishStringSchema,
      roleId: stringSchema,
      salaryRuleId: optionalStringSchema,
    })
    .extend(userMemoSchema.shape),
  response: z.object({
    success: booleanSchema,
  }),
})
