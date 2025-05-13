import useVenueStore from '@/stores/venue.store'
import CheckInQrView from './components/CheckInQRView'

export default function CheckInQr() {
  const { venues } = useVenueStore()

  const baseUrl = window.location.origin
  const qrValue = `${baseUrl}/work-entry?venueId=${Array.from(venues.keys())?.[0]}`

  return <CheckInQrView qrValue={qrValue} />
}
