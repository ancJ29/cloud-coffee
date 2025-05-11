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
  const [denied, setDenied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setDenied(true)
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        setLocation({ latitude, longitude })

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          )
          const data = await res.json()
          setAddress(data.display_name || t('Address not found'))
        } catch {
          setAddress(t('Address not found'))
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setDenied(true)
        }
        setLoading(false)
      },
      { enableHighAccuracy: true },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { location, address, denied, loading }
}
