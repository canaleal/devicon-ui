export const DEVICON_BRANCH = {
  MASTER: 'master',
  DEVELOP: 'develop'
} as const
export type DeviconBranch = (typeof DEVICON_BRANCH)[keyof typeof DEVICON_BRANCH]


export const URL_PARAMS = {
  BRANCH: 'branch',
  ICON: 'icon'
}

export type IconVersion = 'plain' | 'line' | 'original' | 'plain-wordmark' | 'line-wordmark' | 'original-wordmark'

export interface IIcon {
  name: string
  altnames: string[]
  tags: string[]
  versions: {
    svg: IconVersion[]
    font: IconVersion[]
  }
  color: string
  aliases: {
    base: IconVersion
    alias: IconVersion
  }[]
}
