import { getPasswordStrength, passwordRequirements } from '@/utils'
import { PasswordInputProps, Popover, Progress } from '@mantine/core'
import { useState } from 'react'
import PasswordInput from '../PasswordInput'
import PasswordRequirement from './PasswordRequirement'

export default function PasswordStrengthInput({ ...props }: PasswordInputProps) {
  const value = typeof props.value === 'string' ? props.value : ''
  const [popoverOpened, setPopoverOpened] = useState(false)
  const strength = getPasswordStrength(value)

  const color =
    strength === 100 ? 'var(--success)' : strength > 50 ? 'var(--warning)' : 'var(--error)'

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput {...props} />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
        {passwordRequirements.map((requirement, index) => (
          <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
          />
        ))}
      </Popover.Dropdown>
    </Popover>
  )
}
