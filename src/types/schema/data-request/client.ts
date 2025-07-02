import { z } from 'zod'
import {
  booleanSchema,
  getSchema,
  listResponse,
  nullishBooleanSchema,
  optionalStringSchema,
  stringSchema,
} from '../base'
import { clientMemoSchema } from '../configs'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getClientByDomainSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_CLIENT_BY_DOMAIN),
  payload: z.object({
    domain: stringSchema,
  }),
  response: z.object({
    id: stringSchema,
    name: stringSchema,
    enabled: nullishBooleanSchema,
    memo: clientMemoSchema,
  }),
})

export const getClientsByAdminSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.GET_CLIENTS_BY_ADMIN),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      enabled: booleanSchema,
      memo: clientMemoSchema,
    }),
  ),
})

export const registerClientAccountSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.REGISTER_CLIENT_ACCOUNT),
  payload: z.object({
    businessName: stringSchema,
    name: stringSchema,
    email: stringSchema,
    password: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
    message: optionalStringSchema,
  }),
})
