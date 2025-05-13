import { IS_DEV } from '@/configs/constant'

export function debug(...args: unknown[]) {
  if (!IS_DEV) {
    return
  }
  // eslint-disable-next-line no-console
  console.log(
    args
      .map((arg) => {
        if (arg === undefined) {
          return 'undefined'
        }
        if (arg === null) {
          return 'null'
        }
        if (arg instanceof Date) {
          return arg.toISOString()
        }
        if (arg instanceof Error) {
          return [arg.message, arg.stack?.slice(0, 3)].filter(Boolean).join('\n')
        }
        if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2)
        } else {
          return arg
        }
      })
      .join(' '),
  )
}
