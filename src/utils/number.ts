import { SalaryRule } from '@/services/domain'
import { ONE_HOUR } from './time'

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('de-DE').format(Math.floor(value))
}

export function calculateSalary(milliseconds: number, salaryRule?: SalaryRule) {
  const salary = (milliseconds / ONE_HOUR) * (salaryRule?.hourlyPay || 0)
  return salary
}
