export type IconVersion = 'plain' | 'line' | 'original' | 'plain-wordmark' | 'line-wordmark' | 'original-wordmark'
export const FONT_VERSIONS = ['plain', 'line', 'line-wordmark', 'plain-wordmark']
export type DeviconBranch = 'master' | 'develop'

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
