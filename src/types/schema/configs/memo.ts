import { z } from 'zod'
import { optionalBooleanSchema, optionalStringSchema } from '../base'

export const clientMemoSchema = z.object({
  domain: optionalStringSchema,
})

export const userMemoSchema = z.object({
  isEmailVerified: optionalBooleanSchema.default(false),
  canSendEmail: optionalBooleanSchema.default(false),
})
