import ManageButton from '@/components/c-time-keeper/ManageButton'
import useAuthStore from '@/stores/auth.store'
import useVenueStore from '@/stores/venue.store'
import { Flex, Stack } from '@mantine/core'
import Board, { BoardProps } from '../Board'
import Information from '../Information'

export default function WorkingStatusView({ ...props }: BoardProps) {
  const { user } = useAuthStore()
  const { venues } = useVenueStore()

  return (
    <Stack gap={10} align="center" w="100%" h="100dvh">
      <Flex direction={{ base: 'column', sm: 'row' }} gap={20} justify="space-between">
        <Information />
        <Board {...props} />
      </Flex>

      <ManageButton
        navigateUrl={`/work-entry?clientId=${user?.clientId}&venueId=${Array.from(venues.keys())?.[0]}`}
      />
    </Stack>
  )
}
