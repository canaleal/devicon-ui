export const DEVICON_VERSION_RELEASE = 'v2.16.0'
export const DEVICON_CDN_URL = `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css`
export const DEVICON_LINK_TAG = `<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />`

import { IconVersion } from '../types'

export const ICON_VERSION_FA_MAP: Record<IconVersion, string> = {
  original: 'fa-solid fa-square',
  'original-wordmark': 'fa-solid fa-square',
  plain: 'fa-regular fa-square',
  'plain-wordmark': 'fa-regular fa-square',
  line: 'fa-solid fa-wave-square',
  'line-wordmark': 'fa-solid fa-wave-square'
}
