import z from 'zod'

export const passwordRequirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
]

export function getPasswordStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1

  passwordRequirements.forEach((req) => {
    if (!req.re.test(password)) {
      multiplier += 1
    }
  })

  return Math.max(100 - (100 / (passwordRequirements.length + 1)) * multiplier, 10)
}

export const getPasswordSchema = (t: (key: string) => string) =>
  z.string().superRefine((val, ctx) => {
    const trimmed = val.trim()

    if (trimmed === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('Please enter password'),
      })
      return
    }

    if (trimmed.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 6,
        type: 'string',
        inclusive: true,
        message: t('Password must be at least 6 characters long'),
      })
    }

    const isStrong = passwordRequirements.every((req) => req.re.test(trimmed))
    if (!isStrong) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('Password is too weak'),
      })
    }
  })

export const getEmailSchema = (t: (key: string) => string) =>
  z.string().superRefine((val, ctx) => {
    const trimmed = val.trim()

    if (trimmed === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('Please enter email'),
      })
      return
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(trimmed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('Invalid email'),
      })
    }
  })
