import { IS_DEV } from '@/configs/constant'
import { GenericObject } from '@/types'
import axios from 'axios'
import logger from '../logger'
import loadingStore from './store/loading'

export default async function request(
  data: GenericObject,
  token: string | null,
  adminKey?: string,
) {
  loadingStore.startLoading()

  const baseUrl = import.meta.env.VITE_BASE_URL

  try {
    const res = await axios.request({
      method: 'POST',
      url: `${baseUrl}${IS_DEV ? `?action=${data.action}` : ''}`,
      data,
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'x-admin-key': adminKey,
      },
    })
    return res
  } catch (error) {
    logger.error('[api-error]', error)
  } finally {
    loadingStore.stopLoading()
  }
}
