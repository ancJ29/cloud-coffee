import { z } from 'zod'
import { booleanSchema, nullishBooleanSchema, nullishStringSchema, stringSchema } from '../base'
import { clientMemoSchema, userMemoSchema } from '../configs'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const loginSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.LOGIN),
  payload: z.object({
    email: stringSchema,
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
  response: z.object({
    id: stringSchema,
    name: stringSchema,
    email: nullishStringSchema,
    avatar: nullishStringSchema,
    roleId: stringSchema,
    workShiftId: nullishStringSchema,
    enabled: nullishBooleanSchema,
    phone: nullishStringSchema,
    publicId: stringSchema,
    memo: userMemoSchema,
    client: z.object({
      id: stringSchema,
      name: stringSchema,
      enabled: booleanSchema,
      memo: clientMemoSchema,
    }),
  }),
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

export const requestPasswordResetSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.REQUEST_PASSWORD_RESET),
  payload: z.object({
    email: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const resetPasswordSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.RESET_PASSWORD),
  payload: z.object({
    token: stringSchema,
    newPassword: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const requestVerifyEmailSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.REQUEST_VERIFY_EMAIL),
  payload: z.object({}),
  response: z.object({
    success: booleanSchema,
  }),
})

export const verifyEmailSchema = _typeBuilder({
  action: z.literal(RequestAction.VERIFY_EMAIL),
  payload: z.object({
    token: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})
