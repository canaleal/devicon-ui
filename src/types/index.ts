export type IconVersion = 'plain' | 'line' | 'original' | 'plain-wordmark' | 'line-wordmark' | 'original-wordmark'

export const MASTER = 'master'
export const DEVELOP = 'develop'
export type DeviconBranch = typeof MASTER | typeof DEVELOP

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

export interface IException {
  name: string
  message: string
}
