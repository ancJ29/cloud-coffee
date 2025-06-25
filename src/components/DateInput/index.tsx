import classes from '@/styles/Input.module.scss'
import { DateInputProps, DateInput as MantineDateInput } from '@mantine/dates'
import { useCallback, useState } from 'react'

export function DateInput({ ...props }: DateInputProps) {
  const [focused, setFocused] = useState(false)
  const floating =
    typeof props.value === 'string' && props.value.trim().length !== 0 ? true : focused || undefined

  const onFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      setFocused(true)
      props.onFocus?.(e)
    },
    [props],
  )

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      setFocused(false)
      props.onBlur?.(e)
    },
    [props],
  )

  return (
    <MantineDateInput
      {...props}
      label={props.label}
      classNames={classes}
      onFocus={onFocus}
      onBlur={onBlur}
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
  )
}
