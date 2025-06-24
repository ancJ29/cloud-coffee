import {
  changePasswordSchema,
  getMeSchema,
  loginSchema,
  RequestAction,
  requestPasswordResetSchema,
  requestVerifyEmailSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from '@/types'
import z from 'zod'
import callApi from '../api'

export type LoginRequest = z.infer<typeof loginSchema.request>['payload']
export async function login(payload: LoginRequest) {
  return await callApi({
    action: RequestAction.LOGIN,
    payload,
    schema: loginSchema,
  })
}

export type GetMeResponse = z.infer<typeof getMeSchema.response>
export async function getMe() {
  return await callApi({
    action: RequestAction.GET_ME,
    schema: getMeSchema,
    log: true,
  })
}

export type RequestPasswordResetRequest = z.infer<
  typeof requestPasswordResetSchema.request
>['payload']
export async function requestPasswordReset(payload: RequestPasswordResetRequest) {
  return await callApi({
    action: RequestAction.REQUEST_PASSWORD_RESET,
    payload,
    schema: requestPasswordResetSchema,
  })
}

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema.request>['payload']
export async function resetPassword(payload: ResetPasswordRequest) {
  return await callApi({
    action: RequestAction.RESET_PASSWORD,
    payload,
    schema: resetPasswordSchema,
  })
}

export async function requestVerifyEmail() {
  return await callApi({
    action: RequestAction.REQUEST_VERIFY_EMAIL,
    schema: requestVerifyEmailSchema,
  })
}

type VerifyEmailRequest = z.infer<typeof verifyEmailSchema.request>['payload']
export async function verifyEmail(payload: VerifyEmailRequest) {
  return await callApi({
    action: RequestAction.VERIFY_EMAIL,
    payload,
    schema: verifyEmailSchema,
  })
}

type ChangePasswordRequest = z.infer<typeof changePasswordSchema.request>['payload']
export async function changePassword(payload: ChangePasswordRequest) {
  return await callApi({
    action: RequestAction.CHANGE_PASSWORD,
    payload,
    schema: changePasswordSchema,
  })
}
