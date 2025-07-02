import { z } from 'zod'
import {
  checkInByUserSchema,
  checkOutByUserSchema,
  getAttendanceLogsByAdminSchema,
  getAttendanceLogsSchema,
  updateAttendanceLogSchema,
} from './attendance-log'
import {
  changePasswordSchema,
  getMeSchema,
  loginSchema,
  requestPasswordResetSchema,
  requestVerifyEmailSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth'
import {
  getClientByDomainSchema,
  getClientsByAdminSchema,
  registerClientAccountSchema,
} from './client'
import { getPreSignedUrlSchema } from './image'
import { clearDatabaseSchema, initCloudCoffeeDataSchema, initTemplateDateSchema } from './init-data'
import { getVersionSchema } from './metadata'
import { getSalarySchema } from './report'
import { getRolesSchema } from './role'
import { addUserSchema, getUsersByAdminSchema, getUsersSchema, updateUserSchema } from './user'
import { getVenuesByAdminSchema, getVenuesSchema } from './venue'
import { getWorkShiftsSchema } from './work-shift'

export * from './attendance-log'
export * from './auth'
export * from './client'
export * from './image'
export * from './init-data'
export * from './metadata'
export * from './report'
export * from './role'
export * from './user'
export * from './venue'
export * from './work-shift'

export const requestSchema = z.union([
  loginSchema.request,
  getMeSchema.request,
  changePasswordSchema.request,
  requestPasswordResetSchema.request,
  resetPasswordSchema.request,
  getClientsByAdminSchema.request,
  getClientByDomainSchema.request,
  registerClientAccountSchema.request,
  requestVerifyEmailSchema.request,
  verifyEmailSchema.request,
  getUsersSchema.request,
  getUsersByAdminSchema.request,
  updateUserSchema.request,
  addUserSchema.request,
  getRolesSchema.request,
  checkInByUserSchema.request,
  checkOutByUserSchema.request,
  getAttendanceLogsSchema.request,
  getAttendanceLogsByAdminSchema.request,
  updateAttendanceLogSchema.request,
  getVenuesSchema.request,
  getVenuesByAdminSchema.request,
  getSalarySchema.request,
  getWorkShiftsSchema.request,
  getVersionSchema.request,
  clearDatabaseSchema.request,
  initTemplateDateSchema.request,
  initCloudCoffeeDataSchema.request,
  getPreSignedUrlSchema.request,
])

export const responseSchema = z.union([
  loginSchema.response,
  getMeSchema.response,
  changePasswordSchema.response,
  requestPasswordResetSchema.response,
  resetPasswordSchema.response,
  getClientsByAdminSchema.response,
  getClientByDomainSchema.response,
  registerClientAccountSchema.response,
  requestVerifyEmailSchema.response,
  verifyEmailSchema.response,
  getUsersSchema.response,
  getUsersByAdminSchema.response,
  updateUserSchema.response,
  addUserSchema.response,
  getRolesSchema.response,
  checkInByUserSchema.response,
  checkOutByUserSchema.response,
  getAttendanceLogsSchema.response,
  getAttendanceLogsByAdminSchema.response,
  updateAttendanceLogSchema.response,
  getVenuesSchema.response,
  getVenuesByAdminSchema.response,
  getSalarySchema.response,
  getWorkShiftsSchema.response,
  getVersionSchema.response,
  clearDatabaseSchema.response,
  initTemplateDateSchema.response,
  initCloudCoffeeDataSchema.response,
  getPreSignedUrlSchema.response,
])
