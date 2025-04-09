import { useCustomTheme } from '@/hooks/useCustomTheme'
import useTranslation from '@/hooks/useTranslation'
import { Button, ColorInput, ColorPicker, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useCallback } from 'react'

const w = '100%'

export default function Theme() {
  const t = useTranslation()
  const { primaryColor, changPrimaryColor } = useCustomTheme()
  const form = useForm({
    initialValues: { primaryColor },
    validate: _validate(t),
  })

  const submit = useCallback(
    (values: { primaryColor: string }) => {
      changPrimaryColor(values.primaryColor)
    },
    [changPrimaryColor],
  )

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Stack gap={15} align="center" w={{ base: '95%', sm: 300 }}>
        <Text fw={600} fz={24}>
          {t('Theme')}
        </Text>
        <ColorInput
          withPicker={false}
          withEyeDropper={false}
          w={w}
          error={form.errors.primaryColor}
          {...form.getInputProps('primaryColor')}
        />
        <ColorPicker
          format="hex"
          swatches={swatches}
          w={w}
          {...form.getInputProps('primaryColor')}
        />
        <Button type="submit" w={w}>
          {t('Apply')}
        </Button>
      </Stack>
    </form>
  )
}

const isValidHex = (value: string) => /^#([0-9A-F]{3}){1,2}$/i.test(value)
function _validate(t: (s: string) => string) {
  return {
    primaryColor: (value: string) => (isValidHex(value) ? null : t('Invalid color format')),
  }
}

const swatches = [
  '#2e2e2e',
  '#868e96',
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
  '#fd7e14',
]
