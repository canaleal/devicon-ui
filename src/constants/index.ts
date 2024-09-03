import { IconVersion } from '../types'

export const DEVICON_VERSION_RELEASE = 'v2.16.0'
export const DEVICON_CDN_URL = `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css`
export const DEVICON_LINK_TAG = `<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />`

export const ICON_VERSION_FA_MAP: Record<IconVersion, string> = {
  original: 'circle',
  'original-wordmark': 'circle',
  plain: 'square',
  'plain-wordmark': 'square',
  line: 'line',
  'line-wordmark': 'line'
}

export const INIT_STORAGE = {
  branch: 'master',
  darkMode: false
}
