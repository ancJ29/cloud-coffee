import { Venue } from '@/services/domain'
import { Text } from '@mantine/core'

type VenueInformationProps = {
  venue?: Venue
}

export default function VenueInformation({ venue }: VenueInformationProps) {
  return (
    <Text
      style={{
        position: 'absolute',
        top: '8px',
        left: '10px',
        color: 'white',
      }}
      fz={24}
      fw="bold"
    >
      {venue?.name}
    </Text>
  )
}
