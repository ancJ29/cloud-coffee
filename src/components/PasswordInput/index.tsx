import classes from '@/styles/Input.module.scss'
import { PasswordInput as MantinePasswordInput, PasswordInputProps } from '@mantine/core'
import { useCallback, useState } from 'react'

export function PasswordInput({ ...props }: PasswordInputProps) {
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
    <MantinePasswordInput
      {...props}
      label={props.label}
      classNames={classes}
      onFocus={onFocus}
      onBlur={onBlur}
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
  )
}
