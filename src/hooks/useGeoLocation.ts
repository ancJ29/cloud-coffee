import { Language } from '@/configs/i18n'
import { useCallback, useEffect, useState } from 'react'
import useTranslation from './useTranslation'

const language = (localStorage.__LANGUAGE__ || Language.VI) as Language

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

  const shortenAddress = useCallback((fullAddress: string) => {
    return (
      fullAddress
        /* cspell:disable */
        .replace(/Phường\s*(\d+)/gi, 'P.$1')
        .replace(/Quận\s*(\d+)/gi, 'Q.$1')
        .replace(/Thành phố Hồ Chí Minh.*/gi, 'TP.HCM')
      /* cspell:enable */
    )
  }, [])

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
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${language.toLowerCase()}`,
          )
          const data = await res.json()
          setAddress(shortenAddress(data.display_name || t('Address not found')))
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
