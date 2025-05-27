import useVenueStore from '@/stores/venue.store'
import QRCodeForAttendanceView from './components/QRCodeForAttendanceView'

export default function QRCodeForAttendance() {
  const { venues } = useVenueStore()

  const baseUrl = window.location.origin
  const qrValue = `${baseUrl}/work-entry?venueId=${Array.from(venues.keys())?.[0]}`

  return <QRCodeForAttendanceView qrValue={qrValue} />
}
