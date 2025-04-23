import { User } from '@/services/domain'

export enum ShiftStatus {
  NOT_WORKING = 'NOT_WORKING',
  WORKING = 'WORKING',
  DONE = 'DONE',
}

export type UserShiftStatus = User & {
  shiftStatus: ShiftStatus
}
