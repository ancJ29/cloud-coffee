import { IS_DEV } from '@/configs/constant'
import { Language } from '@/configs/i18n'
import { showNotification } from '@/configs/notifications'
import { getMe, GetMeResponse } from '@/services/domain'
import { HandlerContext } from '@/types'
import { ONE_DAY } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

type AuthStore = {
  user: GetMeResponse | null
  token: string | null
  setToken: (token: string, remember?: boolean) => void
  removeToken: () => void
  getMe: (t: (key: string) => string) => Promise<void>
}

export default create<AuthStore>((set, get) => ({
  user: null,
  token: loadToken(),
  setToken: (token: string, remember?: boolean) => {
    if (token) {
      if (!_decode(token)) {
        return
      }
      set(() => ({ token }))
      localStorage.__LAST_LOGIN__ = Date.now()
      localStorage.__REMEMBER__ = remember ?? localStorage.__REMEMBER__
      if (remember) {
        localStorage.__TOKEN__ = token
      } else {
        sessionStorage.__TOKEN__ = token
      }
    }
  },
  removeToken: () => {
    set(() => ({ userId: null, token: null, user: null }))
    clearStorage()
  },
  getMe: async (t: (key: string) => string) => {
    const user = await getMe()
    if (user) {
      if (!isValidDomain(user.client?.domain)) {
        get().removeToken()
        showNotification({
          success: false,
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
  const remember = localStorage.__REMEMBER__ === 'true'
  const version = localStorage.__VERSION__
  const language = localStorage.__LANGUAGE__ || Language.VI
  localStorage.clear()
  sessionStorage.clear()
  localStorage.__REMEMBER__ = remember
  localStorage.__VERSION__ = version
  localStorage.__LANGUAGE__ = language
}

function isValidDomain(userDomain: string) {
  if (IS_DEV) {
    return true
  }
  const currentDomain = window.location.hostname
  return userDomain === currentDomain
}
