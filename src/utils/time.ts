import { DateValue } from '@/types'
import dayjs from 'dayjs'

export const ONE_SECOND = 1000
export const ONE_MINUTE = ONE_SECOND * 60
export const ONE_HOUR = ONE_MINUTE * 60
export const ONE_DAY = ONE_HOUR * 24
export const ONE_WEEK = ONE_DAY * 7

export function formatTime(dateTime?: number | string | Date | null, format = 'DD/MM/YYYY HH:mm') {
  return dateTime ? dayjs(dateTime).format(format) : '-'
}

export function startOfDay(timestamp: number) {
  return dayjs(timestamp).startOf('day').valueOf()
}

export function endOfDay(timestamp: number) {
  return startOfDay(timestamp) + ONE_DAY - ONE_SECOND
}

export function startOfWeek(timestamp: number) {
  const res = timestamp - (timestamp % ONE_WEEK) - 3 * ONE_DAY
  return res + ONE_WEEK > timestamp ? res : res + ONE_WEEK
}

export function endOfWeek(timestamp: number) {
  return endOfDay(startOfWeek(timestamp) + ONE_WEEK - ONE_DAY)
}

export function startOfMonth(timestamp: number): number {
  const date = new Date(timestamp)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export function endOfMonth(timestamp: number): number {
  const date = new Date(timestamp)
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  date.setHours(23, 59, 59, 999)
  return date.getTime()
}

export function formatDuration(totalMilliseconds: number | null) {
  if (totalMilliseconds === null) {
    return '-'
  }
  const hours = Math.floor(totalMilliseconds / ONE_HOUR)
  const minutes = Math.floor((totalMilliseconds % ONE_HOUR) / ONE_MINUTE)

  return `${hours}:${minutes.toString().padStart(2, '0')}`
}

export function isSameDate(a: DateValue, b?: DateValue) {
  if (!a || !b) return false
  return new Date(a).toDateString() === new Date(b).toDateString()
}

function toDateValueRange(start: Date, end: Date): [DateValue, DateValue] {
  return [start.toISOString(), end.toISOString()]
}

export function today(date: Date): [DateValue, DateValue] {
  return toDateValueRange(date, date)
}

export function yesterday(date: Date): [DateValue, DateValue] {
  const yesterday = new Date(date)
  yesterday.setDate(yesterday.getDate() - 1)
  return toDateValueRange(yesterday, yesterday)
}

export function thisWeek(date: Date): [DateValue, DateValue] {
  const start = new Date(startOfWeek(date.getTime()))
  const end = new Date(endOfWeek(date.getTime()))
  return toDateValueRange(start, end)
}

export function lastWeek(date: Date): [DateValue, DateValue] {
  const lastWeekTime = date.getTime() - ONE_WEEK
  const start = new Date(startOfWeek(lastWeekTime))
  const end = new Date(endOfWeek(lastWeekTime))
  return toDateValueRange(start, end)
}

export function thisMonth(date: Date): [DateValue, DateValue] {
  const start = new Date(startOfMonth(date.getTime()))
  const end = new Date(endOfMonth(date.getTime()))
  return toDateValueRange(start, end)
}

export function lastMonth(date: Date): [DateValue, DateValue] {
  const lastMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1)
  const start = new Date(startOfMonth(lastMonthDate.getTime()))
  const end = new Date(endOfMonth(lastMonthDate.getTime()))
  return toDateValueRange(start, end)
}
