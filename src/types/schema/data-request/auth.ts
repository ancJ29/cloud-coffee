import { z } from 'zod'
import { booleanSchema, nullishBooleanSchema, nullishStringSchema, stringSchema } from '../base'
import { userMemoSchema } from '../configs'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const loginSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.LOGIN),
  payload: z.object({
    username: stringSchema,
    password: stringSchema,
  }),
  response: z.object({
    token: stringSchema,
  }),
})

export const getMeSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_ME),
  payload: z.object({}),
  response: z
    .object({
      id: stringSchema,
      name: stringSchema,
      username: stringSchema,
      email: stringSchema,
      avatar: nullishStringSchema,
      roleId: stringSchema,
      salaryRuleId: nullishStringSchema,
      clientId: stringSchema,
      enabled: nullishBooleanSchema,
    })
    .extend(userMemoSchema.shape),
})

export const changePasswordSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.CHANGE_PASSWORD),
  payload: z.object({
    currentPassword: stringSchema,
    newPassword: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const resetPasswordSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.RESET_PASSWORD),
  payload: z.object({
    email: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})
