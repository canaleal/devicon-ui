import { INIT_STORAGE } from '../constants'

const storagePrefix = 'devicon_ui_react_'
const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}_token`) as string) || INIT_STORAGE
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}_token`, JSON.stringify(token))
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}_token`)
  }
}

export default storage
