import { z } from 'zod'
import {
  dayOfWeekSchema,
  numberSchema,
  optionalBooleanSchema,
  optionalNumberSchema,
  optionalStringSchema,
  timeSchema,
} from '../base'

export const clientMemoSchema = z.object({
  domain: optionalStringSchema,
})

export const userMemoSchema = z.object({
  tokenVersion: optionalNumberSchema.default(0),
  isEmailVerified: optionalBooleanSchema.default(false),
})

export const workShiftMemoSchema = z.object({
  overtimeRates: z.record(dayOfWeekSchema, numberSchema).optional(),
  dailySchedules: z
    .record(
      dayOfWeekSchema,
      z.object({
        startTime: timeSchema,
        endTime: timeSchema,
        salaryRate: numberSchema,
      }),
    )
    .optional(),
  shiftItems: z
    .object({
      startTime: timeSchema,
      endTime: timeSchema,
      breakMinutes: optionalNumberSchema,
      salaryRate: numberSchema,
      note: optionalStringSchema,
    })
    .array()
    .optional(),
  dayOffSettings: z
    .object({
      dayOfWeeks: dayOfWeekSchema.array(),
      equivalentHours: numberSchema,
    })
    .optional(),
  breakSettings: z
    .object({
      startTime: timeSchema,
      durationHours: numberSchema,
      durationMinutes: numberSchema,
      dayOfWeeks: dayOfWeekSchema.array(),
    })
    .array()
    .optional(),
})
