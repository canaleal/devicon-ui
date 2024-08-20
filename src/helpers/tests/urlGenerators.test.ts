import { describe, it, expect } from 'vitest'
import { toUrlSafeB64, fromUrlSafeB64 } from '../urlGenerators'

describe('toUrlSafeB64', () => {
  it('should convert a string to URL-safe Base64 encoding', () => {
    const input = 'Hello, World!'
    const result = toUrlSafeB64(input)
    expect(result).toBe('SGVsbG8sIFdvcmxkIQ=='.replace(/\//g, '_').replace(/\+/g, '-'))
  })

  it('should handle a string with special characters correctly', () => {
    const input = 'foo/bar+baz'
    const result = toUrlSafeB64(input)
    expect(result).toBe('Zm9vL2JhcitiYXo='.replace(/\//g, '_').replace(/\+/g, '-'))
  })

  it('should handle an empty string correctly', () => {
    const input = ''
    const result = toUrlSafeB64(input)
    expect(result).toBe('')
  })
})

describe('fromUrlSafeB64', () => {
  it('should decode a URL-safe Base64 encoded string', () => {
    const input = 'SGVsbG8sIFdvcmxkIQ=='.replace(/\//g, '_').replace(/\+/g, '-')
    const result = fromUrlSafeB64(input)
    expect(result).toBe('Hello, World!')
  })

  it('should decode a string with special characters correctly', () => {
    const input = 'Zm9vL2Jhcitib3o='.replace(/\//g, '_').replace(/\+/g, '-')
    const result = fromUrlSafeB64(input)
    expect(result).toBe('foo/bar+boz')
  })

  it('should handle an empty string correctly', () => {
    const input = ''
    const result = fromUrlSafeB64(input)
    expect(result).toBe('')
  })
})
