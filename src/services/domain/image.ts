import { getPreSignedUrlSchema, RequestAction } from '@/types'
import axios from 'axios'
import { z } from 'zod'
import callApi from '../api'
import logger from '../logger'
import loadingStore from '../request/store/loading'

export type GetPreSignedUrlRequest = z.infer<typeof getPreSignedUrlSchema.request>['payload']
export async function getPreSignedUrl(payload: GetPreSignedUrlRequest) {
  return await callApi({
    action: RequestAction.GET_PRE_SIGNED_URL,
    payload,
    schema: getPreSignedUrlSchema,
    adminKey: import.meta.env.VITE_ADMIN_KEY,
  })
}

type UploadImageToS3Props = {
  method: string
  url: string
  file: File
}

export async function uploadImageToS3({
  method,
  url,
  file,
}: UploadImageToS3Props): Promise<{ success: boolean }> {
  loadingStore.startLoading()
  try {
    const response = await axios.request({
      method,
      url,
      data: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    return { success: response.status === 200 }
  } catch (error) {
    logger.error('[upload-image-error]', error)
    return { success: false }
  } finally {
    loadingStore.stopLoading()
  }
}
