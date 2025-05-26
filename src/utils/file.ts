import { BUCKET_NAME } from '@/configs/constant'

export function dataUrlToFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)
  const mime = mimeMatch ? mimeMatch[1] : ''
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export function getObjectKey(clientId: string, userId: string, file: File, isCheckIn: boolean) {
  return `${clientId}/${userId}/${isCheckIn ? 'checkin' : 'checkout'}/${file.name}`
}

export function getImageUrl(objectKey: string) {
  return `https://${BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${objectKey}`
}
