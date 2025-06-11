import { z } from 'zod'
import { changePasswordSchema, getMeSchema, loginSchema, resetPasswordSchema } from './auth'
import {
  getClientByDomainSchema,
  getClientsByAdminSchema,
  registerClientAccountSchema,
} from './client'
import { getPreSignedUrlSchema } from './image'
import {
  clearDatabaseSchema,
  initCloudCoffeeDataSchema,
  initNovaWorkDataSchema,
  initTemplateDateSchema,
} from './init-data'
import { getVersionSchema } from './metadata'
import { getSalarySchema } from './report'
import { getRolesSchema } from './role'
import { getSalaryRulesSchema } from './salary-rule'
import {
  checkInByUserSchema,
  checkOutByUserSchema,
  getShiftsByAdminSchema,
  getShiftsSchema,
  updateShiftSchema,
} from './shift'
import { addUserSchema, getUsersByAdminSchema, getUsersSchema, updateUserSchema } from './user'
import { getVenuesByAdminSchema, getVenuesSchema } from './venue'

export * from './auth'
export * from './client'
export * from './image'
export * from './init-data'
export * from './metadata'
export * from './report'
export * from './role'
export * from './salary-rule'
export * from './shift'
export * from './user'
export * from './venue'

export const requestSchema = z.union([
  loginSchema.request,
  getMeSchema.request,
  changePasswordSchema.request,
  resetPasswordSchema.request,
  getClientsByAdminSchema.request,
  getClientByDomainSchema.request,
  registerClientAccountSchema.request,
  getUsersSchema.request,
  getUsersByAdminSchema.request,
  updateUserSchema.request,
  addUserSchema.request,
  getRolesSchema.request,
  checkInByUserSchema.request,
  checkOutByUserSchema.request,
  getShiftsSchema.request,
  getShiftsByAdminSchema.request,
  updateShiftSchema.request,
  getVenuesSchema.request,
  getVenuesByAdminSchema.request,
  getSalarySchema.request,
  getSalaryRulesSchema.request,
  getVersionSchema.request,
  clearDatabaseSchema.request,
  initTemplateDateSchema.request,
  initCloudCoffeeDataSchema.request,
  initNovaWorkDataSchema.request,
  getPreSignedUrlSchema.request,
])

export const responseSchema = z.union([
  loginSchema.response,
  getMeSchema.response,
  changePasswordSchema.response,
  resetPasswordSchema.response,
  getClientsByAdminSchema.response,
  getClientByDomainSchema.response,
  registerClientAccountSchema.response,
  getUsersSchema.response,
  getUsersByAdminSchema.response,
  updateUserSchema.response,
  addUserSchema.response,
  getRolesSchema.response,
  checkInByUserSchema.response,
  checkOutByUserSchema.response,
  getShiftsSchema.response,
  getShiftsByAdminSchema.response,
  updateShiftSchema.response,
  getVenuesSchema.response,
  getVenuesByAdminSchema.response,
  getSalarySchema.response,
  getSalaryRulesSchema.response,
  getVersionSchema.response,
  clearDatabaseSchema.response,
  initTemplateDateSchema.response,
  initCloudCoffeeDataSchema.response,
  initNovaWorkDataSchema.response,
  getPreSignedUrlSchema.response,
])
