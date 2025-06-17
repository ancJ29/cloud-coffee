import { NumberInput as MantineNumberInput, NumberInputProps } from '@mantine/core'

export default function NumberInput({ ...props }: NumberInputProps) {
  return <MantineNumberInput thousandSeparator="." decimalSeparator="," {...props} />
}
