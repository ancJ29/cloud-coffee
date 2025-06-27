import useWindowResize from '@/hooks/useWindowResize'
import classes from '@/styles/Input.module.scss'
import { ActionIcon } from '@mantine/core'
import { TimeInput as MantineTimeInput, TimeInputProps } from '@mantine/dates'
import { IconClock } from '@tabler/icons-react'
import { useCallback, useRef, useState } from 'react'

export function TimeInput({ ...props }: TimeInputProps) {
  const isMobile = useWindowResize()
  const ref = useRef<HTMLInputElement>(null)
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

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  )

  return (
    <MantineTimeInput
      {...props}
      ref={ref}
      rightSection={isMobile ? null : pickerControl}
      label={props.label}
      classNames={classes}
      onFocus={onFocus}
      onBlur={onBlur}
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
  )
}
