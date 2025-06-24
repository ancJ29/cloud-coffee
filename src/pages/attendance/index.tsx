import useVenueStore from '@/stores/venue.store'
import AttendanceView from './components/AttendanceView'

export default function Attendance() {
  const { venues } = useVenueStore()

  const baseUrl = window.location.origin
  const qrValue = `${baseUrl}/work-entry?venueId=${Array.from(venues.keys())?.[0]}`

  return <AttendanceView qrValue={qrValue} />
}
