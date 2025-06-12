import { z } from 'zod'
import { booleanSchema, numberSchema, optionalStringSchema, stringSchema } from '../base'
import { ClientName } from '../configs'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const clearDatabaseSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.CLEAR_DATABASE),
  payload: z.object({}),
  response: z.object({
    success: booleanSchema,
  }),
})

export const initTemplateDateSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.INIT_TEMPLATE_DATA),
  payload: z.object({}),
  response: z.object({
    success: booleanSchema,
  }),
})

export const initCloudCoffeeDataSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.INIT_CLOUD_COFFEE_DATA),
  payload: z.object({
    clientName: optionalStringSchema.default(ClientName.CLOUD_COFFEE),
    domain: stringSchema,
    salaryRuleName: stringSchema,
    hourlyPay: numberSchema,
    ownerEmail: stringSchema,
    totalUsers: numberSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const initNovaWorkDataSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.INIT_NOVA_WORK_DATA),
  payload: z.object({
    clientName: optionalStringSchema.default(ClientName.NOVA_WORK),
    domain: stringSchema,
    salaryRuleName: stringSchema,
    standardHours: numberSchema,
    hourlyPay: numberSchema,
    overtimePay: numberSchema,
    ownerEmail: stringSchema,
    totalUsers: numberSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})
