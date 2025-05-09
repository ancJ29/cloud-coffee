import { z } from 'zod'
import { changePasswordSchema, getMeSchema, loginSchema, resetPasswordSchema } from './auth'
import { getClientsSchema } from './client'
import {
  clearDatabaseSchema,
  initCloudCoffeeDataSchema,
  initNovaWorkDataSchema,
  initPhamTuanMotorcareDataSchema,
  initTemplateDateSchema,
} from './init-data'
import { getVersionSchema } from './metadata'
import { getSalarySchema } from './report'
import { getRolesSchema } from './role'
import { getSalaryRulesSchema } from './salary-rule'
import {
  checkInBySystemSchema,
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
  getUsersSchema.request,
  getUsersByAdminSchema.request,
  updateUserSchema.request,
  addUserSchema.request,
  getClientsSchema.request,
  getRolesSchema.request,
  checkInBySystemSchema.request,
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
  initPhamTuanMotorcareDataSchema.request,
])

export const responseSchema = z.union([
  loginSchema.response,
  getMeSchema.response,
  changePasswordSchema.response,
  resetPasswordSchema.response,
  getUsersSchema.response,
  getUsersByAdminSchema.response,
  updateUserSchema.response,
  addUserSchema.response,
  getClientsSchema.response,
  getRolesSchema.response,
  checkInBySystemSchema.response,
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
  initPhamTuanMotorcareDataSchema.response,
])
