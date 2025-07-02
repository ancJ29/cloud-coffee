import { getWorkShiftsSchema, RequestAction } from '@/types'
import { z } from 'zod'
import { loadAll } from '../data-loader'

export type WorkShift = z.infer<typeof getWorkShiftsSchema.response>['data'][0]
export async function getAllWorkShifts() {
  return await loadAll({
    action: RequestAction.GET_WORK_SHIFTS,
    schema: getWorkShiftsSchema,
  })
}
