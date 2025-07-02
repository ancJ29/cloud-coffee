import { IS_DEV } from '@/configs/constant'
import { Language } from '@/configs/i18n'
import { pushNotification } from '@/configs/notifications'
import { getMe, GetMeResponse } from '@/services/domain'
import { HandlerContext, NotificationType } from '@/types'
import { ONE_DAY } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

type AuthStore = {
  user: GetMeResponse | null
  token: string | null
  setToken: (token: string) => void
  removeToken: () => void
  getMe: (t: (key: string) => string) => Promise<void>
}

export default create<AuthStore>((set, get) => ({
  user: null,
  token: loadToken(),
  setToken: (token: string) => {
    if (token) {
      if (!_decode(token)) {
        return
      }
      set(() => ({ token }))
      localStorage.__LAST_LOGIN__ = Date.now()
      localStorage.__TOKEN__ = token
    }
  },
  removeToken: () => {
    set(() => ({ userId: null, token: null, user: null }))
    clearStorage()
  },
  getMe: async (t: (key: string) => string) => {
    const user = await getMe()
    if (user) {
      if (!isValidDomain(user.client?.memo.domain)) {
        get().removeToken()
        pushNotification({
          type: NotificationType.ERROR,
          message: t('The domain you are trying to access is invalid'),
        })
        return
      }
      set(() => ({ user }))
    } else {
      get().removeToken()
    }
  },
}))

function loadToken() {
  if (!localStorage.__LAST_LOGIN__) {
    return null
  }
  const today = Math.floor(Date.now() / ONE_DAY)
  const lastLogin = parseInt(localStorage.__LAST_LOGIN__ || '0')
  const loginDate = Math.floor(lastLogin / ONE_DAY)
  if (today !== loginDate) {
    clearStorage()
    return null
  } else {
    const token = localStorage.__TOKEN__ || sessionStorage.__TOKEN__
    return token
  }
}

function _decode(token: string) {
  const data = jwtDecode(token) as HandlerContext
  return data.id
}

function clearStorage() {
  const version = localStorage.__VERSION__
  const language = localStorage.__LANGUAGE__ || Language.VI
  localStorage.clear()
  sessionStorage.clear()
  localStorage.__VERSION__ = version
  localStorage.__LANGUAGE__ = language
}

function isValidDomain(userDomain?: string) {
  if (IS_DEV || !userDomain) {
    return true
  }
  return userDomain === window.location.hostname
}
