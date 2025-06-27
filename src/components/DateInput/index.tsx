import classes from '@/styles/Input.module.scss'
import {
  DateInput as MantineDateInput,
  DateInputProps as MantineDateInputProps,
} from '@mantine/dates'
import { useCallback, useState } from 'react'
import { InputLabel } from '../InputLabel'

interface DateInputProps extends MantineDateInputProps {
  hint?: string
}

export function DateInput({ hint, ...props }: DateInputProps) {
  const [focused, setFocused] = useState(false)
  const value = props.defaultValue || props.value
  const floating = value !== undefined ? true : focused || undefined

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
      valueFormat="DD/MM/YYYY"
      {...props}
      label={<InputLabel label={props.label} hint={hint} />}
      classNames={classes}
      onFocus={onFocus}
      onBlur={onBlur}
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
  )
}
