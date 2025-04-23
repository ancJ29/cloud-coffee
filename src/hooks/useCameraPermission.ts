import { useEffect, useState } from 'react'

export default function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setHasPermission(true)
      })
      .catch(() => {
        setHasPermission(false)
      })
  }, [])

  return hasPermission
}
