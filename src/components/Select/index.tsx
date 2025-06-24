import classes from '@/styles/Input.module.scss'
import { OptionProps } from '@/types'
import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useCallback, useMemo, useState } from 'react'

interface SelectProps extends MantineSelectProps {
  options: OptionProps[]
}

export function Select({ options, ...props }: SelectProps) {
  const data = useMemo(() => {
    return options?.map(({ value, label }, idx) => ({
      value: value.toString(),
      label,
      isLastOption: idx === options?.length - 1,
    }))
  }, [options])

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
    <MantineSelect
      data={data}
      disabled={props.disabled ?? (data?.length || 0) < 1}
      checkIconPosition="right"
      rightSection={<IconChevronDown size={16} />}
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
