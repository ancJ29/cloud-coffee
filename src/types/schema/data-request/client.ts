import { z } from 'zod'
import { nullishBooleanSchema, stringSchema } from '../base'
import { clientMemoSchema } from '../configs'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getClientByDomainSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_CLIENT_BY_DOMAIN),
  payload: z.object({
    domain: stringSchema,
  }),
  response: z
    .object({
      id: stringSchema,
      name: stringSchema,
      enabled: nullishBooleanSchema,
    })
    .extend(clientMemoSchema.shape),
})
