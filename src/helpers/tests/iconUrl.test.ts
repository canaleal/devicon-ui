import { describe, it, expect } from 'vitest'
import { DeviconBranch, IconVersion } from '../../types'
import { createDeviconJsonUrl, createDeviconIconUrl } from '../iconUrl'

// Tests for createDeviconJsonUrl function
describe('createDeviconJsonUrl', () => {
  it('should return the correct URL for the master branch', () => {
    const branch: DeviconBranch = 'master'
    const url = createDeviconJsonUrl(branch)
    expect(url).toBe('https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.json')
  })

  it('should return the correct URL for the develop branch', () => {
    const branch: DeviconBranch = 'develop'
    const url = createDeviconJsonUrl(branch)
    expect(url).toBe('https://raw.githubusercontent.com/devicons/devicon/develop/devicon.json')
  })
})

// Tests for createDeviconIconUrl function
describe('createDeviconIconUrl', () => {
  it('should return the correct URL for an icon in the master branch', () => {
    const branch: DeviconBranch = 'master'
    const iconName = 'react'
    const version: IconVersion = 'plain'
    const url = createDeviconIconUrl(iconName, version, branch)
    expect(url).toBe('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-plain.svg')
  })

  it('should return the correct URL for an icon in the develop branch', () => {
    const branch: DeviconBranch = 'develop'
    const iconName = 'react'
    const version: IconVersion = 'line'
    const url = createDeviconIconUrl(iconName, version, branch)
    expect(url).toBe('https://raw.githubusercontent.com/devicons/devicon/develop/icons/react/react-line.svg')
  })

  it('should return the correct URL for an icon with wordmark in the master branch', () => {
    const branch: DeviconBranch = 'master'
    const iconName = 'react'
    const version: IconVersion = 'plain-wordmark'
    const url = createDeviconIconUrl(iconName, version, branch)
    expect(url).toBe('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-plain-wordmark.svg')
  })

  it('should return the correct URL for an icon with wordmark in the develop branch', () => {
    const branch: DeviconBranch = 'develop'
    const iconName = 'react'
    const version: IconVersion = 'line-wordmark'
    const url = createDeviconIconUrl(iconName, version, branch)
    expect(url).toBe('https://raw.githubusercontent.com/devicons/devicon/develop/icons/react/react-line-wordmark.svg')
  })
})
