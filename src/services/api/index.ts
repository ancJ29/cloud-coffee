import { DataRequest, RequestAction } from '@/types'
import { debug } from '@/utils'
import request from '../request'

type CallApiProps<T extends RequestAction, U, R> = {
  action: T
  payload?: U
  schema: DataRequest<T, U, R>
}

export default async function callApi<T extends RequestAction, U, R>({
  action,
  payload = {} as U,
  schema,
  log = false,
  adminKey,
  delay,
}: CallApiProps<T, U, R> & {
  log?: boolean
  adminKey?: string
  delay?: number
}): Promise<R | undefined> {
  const token = sessionStorage.__TOKEN__ || localStorage.__TOKEN__
  const res = await request({ data: { action, payload }, token, adminKey, delay })
  if (log) {
    debug(
      {
        action,
        payload,
      },
      res?.data || '---',
    )
  }
  const parsed = schema.response.safeParse(res?.data)
  if (parsed.success) {
    return parsed.data
  }
  return undefined
}
