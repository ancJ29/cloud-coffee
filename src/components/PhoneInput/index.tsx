import classes from '@/styles/Input.module.scss'
import { TextInput as MantineTextInput, TextInputProps } from '@mantine/core'
import { useCallback, useState } from 'react'

export function PhoneInput(props: TextInputProps) {
  const [focused, setFocused] = useState(false)

  const floating =
    typeof props.value === 'string' && props.value.trim().length !== 0 ? true : focused || undefined

  const onFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      props.onFocus?.(e)
    },
    [props],
  )

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      props.onBlur?.(e)
    },
    [props],
  )

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyDigits = e.target.value.replace(/[^\d]/g, '')
      props.onChange?.({ ...e, target: { ...e.target, value: onlyDigits } })
    },
    [props],
  )

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']

    if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault()
    }
  }, [])

  return (
    <MantineTextInput
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
      classNames={classes}
      maxLength={15}
    />
  )
}
