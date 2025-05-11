import { getVenuesByAdminSchema, getVenuesSchema, RequestAction } from '@/types'
import { z } from 'zod'
import { loadAll } from '../data-loader'

export type Venue = z.infer<typeof getVenuesSchema.response>['data'][0]
export async function getAllVenues() {
  return await loadAll({
    action: RequestAction.GET_VENUES,
    schema: getVenuesSchema,
  })
}

type GetVenuesByAdmin = z.infer<typeof getVenuesByAdminSchema.request>['payload']
export async function getAllVenuesByAdmin(payload: GetVenuesByAdmin) {
  return await loadAll({
    action: RequestAction.GET_VENUES_BY_ADMIN,
    payload,
    schema: getVenuesByAdminSchema,
    adminKey: import.meta.env.VITE_ADMIN_KEY,
  })
}
