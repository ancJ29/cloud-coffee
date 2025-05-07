import { useEffect, useState } from 'react'

type Location = {
  latitude: number
  longitude: number
} | null

export function useLocation() {
  const [location, setLocation] = useState<Location>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
      },
    )
  }, [])

  return { location, error, loading }
}
