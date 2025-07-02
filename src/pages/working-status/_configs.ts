import { User } from '@/services/domain'

export enum AttendanceStatus {
  NOT_WORKING = 'NOT_WORKING',
  WORKING = 'WORKING',
  DONE = 'DONE',
}

export type UserAttendanceStatus = User & {
  attendanceStatus: AttendanceStatus
}
