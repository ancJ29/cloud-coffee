import { z } from 'zod'

export const unknownSchema = z.unknown()
export const numberSchema = z.number()
export const nullishNumberSchema = numberSchema.nullish()
export const optionalNumberSchema = numberSchema.optional()
export const stringSchema = z.string()
export const optionalStringSchema = stringSchema.optional()
export const nullishStringSchema = stringSchema.nullish()
export const booleanSchema = z.boolean()
export const nullishBooleanSchema = booleanSchema.nullish()
export const optionalBooleanSchema = booleanSchema.optional()
export const timeSchema = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
export const dayOfWeekSchema = z.number().int().gte(0).lte(6)

export const getSchema = z.object({
  cursor: optionalStringSchema,
  take: numberSchema.min(1).max(100).optional().default(20),
})

export const listResponse = <T extends z.ZodTypeAny>(dataType: T) =>
  z.object({
    data: z.array(dataType),
    cursor: optionalStringSchema,
    hasMore: optionalBooleanSchema,
  })

export type UnknownRecord = Record<string, unknown>
