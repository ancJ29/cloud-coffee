import { useEffect, useState } from 'react'
import useTranslation from './useTranslation'

type GeoLocation = {
  latitude: number
  longitude: number
}

export function useGeoLocation() {
  const t = useTranslation()
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(t('Location permission has not been granted to the browser'))
      setLoading(false)
      return
    }

    const handleSuccess = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords
      setLocation({ latitude, longitude })

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        )
        const data = await res.json()
        setAddress(data.display_name || t('Address not found'))
      } catch (fetchErr) {
        setError(t('Failed to fetch address from coordinates'))
      } finally {
        setLoading(false)
      }
    }

    const handleError = (err: GeolocationPositionError) => {
      setError(err.message)
      setLoading(false)
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { location, address, error, loading }
}
