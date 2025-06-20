import { z } from 'zod'
import { optionalBooleanSchema, optionalNumberSchema, optionalStringSchema } from '../base'

export const clientMemoSchema = z.object({
  domain: optionalStringSchema,
})

export const userMemoSchema = z.object({
  tokenVersion: optionalNumberSchema.default(0),
  isEmailVerified: optionalBooleanSchema.default(false),
})
