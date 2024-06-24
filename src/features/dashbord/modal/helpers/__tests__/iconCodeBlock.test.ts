// Assuming you have Jest configured and installed

import { IIconSize } from '../../types'
import { adjustSVGAttributes, getImageTag, getITag, createIconCodeBlockText } from '../iconCodeBlock'
import { MOCK_EXAMPLE_ICON } from './mocks'

describe('adjustSVGAttributes', () => {
  it('adjusts the width and height attributes of an SVG', () => {
    const svgContent = '<svg width="100" height="100"></svg>'
    const iconSize: IIconSize = { name: 'Small', width: 50, height: 50 }
    const adjustedSVG = adjustSVGAttributes(svgContent, iconSize)

    // Add assertions based on the expected behavior
    expect(adjustedSVG).toContain('width="50"')
    expect(adjustedSVG).toContain('height="50"')
  })
})

describe('getImageTag', () => {
  it('generates an <img> tag with the correct attributes', () => {
    const icon = MOCK_EXAMPLE_ICON
    const iconSize: IIconSize = { name: 'Small', width: 100, height: 100 }
    const iconUrl = 'https://example.com/icon.svg'
    const imgTag = getImageTag(icon, iconUrl, iconSize)

    // Add assertions based on the expected behavior
    expect(imgTag).toContain(`<img src="${iconUrl}"`)
    expect(imgTag).toContain(`alt="${icon.name}"`)
    expect(imgTag).toContain(`height="${iconSize.height}"`)
    expect(imgTag).toContain(`width="${iconSize.width}"`)
  })
})

describe('getITag', () => {
  it('generates an <i> tag with the correct class and version', () => {
    const icon = MOCK_EXAMPLE_ICON
    const selectedVersion = 'plain'
    const iTag = getITag(icon, selectedVersion)

    // Add assertions based on the expected behavior
    expect(iTag).toContain(`<i class="devicon-${icon.name}-${selectedVersion} colored"></i>`)
  })
})

describe('createIconCodeBlockText', () => {
  it('returns the correct code block text based on the selected format', async () => {
    const icon = MOCK_EXAMPLE_ICON
    const iconSize: IIconSize = { name: 'Small', width: 100, height: 100 }
    const iconUrl = 'https://example.com/icon.svg'
    const selectedVersion = 'plain'
    const selectedCodeBlockFormat = 'LINK'
    const codeBlockText = await createIconCodeBlockText(
      icon,
      iconSize,
      iconUrl,
      selectedVersion,
      selectedCodeBlockFormat
    )

    // Add assertions based on the expected behavior
    expect(codeBlockText).toBe(iconUrl)
  })
})
