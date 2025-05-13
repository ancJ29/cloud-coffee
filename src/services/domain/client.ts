import { getClientByDomainSchema, RequestAction } from '@/types'
import { z } from 'zod'
import callApi from '../api'

export type Client = z.infer<typeof getClientByDomainSchema.response>
type GetClientByDomainRequest = z.infer<typeof getClientByDomainSchema.request>['payload']
export async function getClientByDomain(payload: GetClientByDomainRequest) {
  return await callApi({
    action: RequestAction.GET_CLIENT_BY_DOMAIN,
    payload,
    schema: getClientByDomainSchema,
  })
}
