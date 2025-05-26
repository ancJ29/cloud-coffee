import { z } from 'zod'
import { optionalStringSchema, stringSchema } from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getPreSignedUrlSchema = _typeBuilder({
  action: z.literal(RequestAction.GET_PRE_SIGNED_URL),
  payload: z.object({
    bucketName: stringSchema,
    objectKey: stringSchema,
    clientId: stringSchema,
    contentType: optionalStringSchema,
  }),
  response: z.object({
    method: stringSchema,
    url: stringSchema,
  }),
})
