import classes from '@/styles/Input.module.scss'
import {
  NumberInput as MantineNumberInput,
  NumberInputProps as MantineNumberInputProps,
} from '@mantine/core'
import { useCallback, useState } from 'react'
import { InputLabel } from '../InputLabel'

interface NumberInputProps extends MantineNumberInputProps {
  hint?: string
}

export function NumberInput({ hint, ...props }: NumberInputProps) {
  const [focused, setFocused] = useState(false)
  const floating =
    props.value !== undefined || props.defaultValue !== undefined ? true : focused || undefined

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
    <MantineNumberInput
      decimalScale={2}
      {...props}
      thousandSeparator=","
      decimalSeparator="."
      label={<InputLabel label={props.label} hint={hint} />}
      classNames={classes}
      onFocus={onFocus}
      onBlur={onBlur}
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
  )
}
