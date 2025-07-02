import { z } from 'zod'
import {
  getSchema,
  listResponse,
  nullishNumberSchema,
  nullishStringSchema,
  numberSchema,
  stringSchema,
} from '../base'
import { workShiftMemoSchema } from '../configs'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getWorkShiftsSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_WORK_SHIFTS),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: nullishStringSchema,
      contractHours: nullishNumberSchema,
      hourlySalary: numberSchema,
      memo: workShiftMemoSchema,
    }),
  ),
})
