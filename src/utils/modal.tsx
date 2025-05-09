import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export function showNotImplementedModal(t: (key: string) => string) {
  modals.open({
    withCloseButton: false,
    zIndex: 2000,
    children: (
      <Text size="sm" c="var(--error)" fw={800} w="100%" ta="center">
        {t('Sorry, this feature is implemented yet')}
      </Text>
    ),
  })
}
