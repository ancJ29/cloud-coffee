import { z } from 'zod'
import { optionalBooleanSchema, optionalNumberSchema, stringSchema } from '../base'

export const clientMemoSchema = z.object({
  domain: stringSchema,
})

export const userMemoSchema = z.object({
  baseSalary: optionalNumberSchema.default(0),
  canSendEmail: optionalBooleanSchema.default(false),
})
