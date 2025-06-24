import { ManageButton } from '@/components'
import { Venue } from '@/services/domain'
import { Flex, Stack } from '@mantine/core'
import Board, { BoardProps } from '../Board'
import Information from '../Information'

type WorkingStatusViewProps = {
  venues: Venue[]
} & BoardProps

export default function WorkingStatusView({ venues, ...props }: WorkingStatusViewProps) {
  return (
    <Stack gap={10} align="center" w="100%" h="100dvh">
      <Flex direction={{ base: 'column', sm: 'row' }} gap={20} justify="space-between">
        <Information />
        <Board {...props} />
      </Flex>

      <ManageButton navigateUrl={`/work-entry?venueId=${venues[0]?.id}`} />
    </Stack>
  )
}
