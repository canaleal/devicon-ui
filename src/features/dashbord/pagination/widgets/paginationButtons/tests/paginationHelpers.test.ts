import { describe, it, expect } from 'vitest'
import { getPaginationButtons } from '../paginationHelpers'

describe('getPaginationButtons', () => {
  it('should return the correct pagination buttons when current page is in the middle', () => {
    expect(getPaginationButtons(5, 10)).toEqual([1, '...', 3, 4, 5, 6, 7, '...', 10])
  })

  it('should return the correct pagination buttons when current page is at the start', () => {
    expect(getPaginationButtons(1, 10)).toEqual([1, 2, 3, '...', 10])
  })

  it('should return the correct pagination buttons when current page is at the end', () => {
    expect(getPaginationButtons(10, 10)).toEqual([1, '...', 8, 9, 10])
  })

  it('should return the correct pagination buttons for a small number of pages', () => {
    expect(getPaginationButtons(2, 3)).toEqual([1, 2, 3])
  })

  it('should return only one button when there is only one page', () => {
    expect(getPaginationButtons(1, 1)).toEqual([1])
  })

  it('should return correct buttons when there are exactly 2 pages', () => {
    expect(getPaginationButtons(1, 2)).toEqual([1, 2])
    expect(getPaginationButtons(2, 2)).toEqual([1, 2])
  })

  it('should handle edge case where current page is the first but total pages are large', () => {
    expect(getPaginationButtons(1, 100)).toEqual([1, 2, 3, '...', 100])
  })

  it('should handle edge case where current page is the last but total pages are large', () => {
    expect(getPaginationButtons(100, 100)).toEqual([1, '...', 98, 99, 100])
  })

  it('should handle edge case where totalPages is 2 and currentPage is 1', () => {
    expect(getPaginationButtons(1, 2)).toEqual([1, 2])
  })

  it('should handle edge case where totalPages is 2 and currentPage is 2', () => {
    expect(getPaginationButtons(2, 2)).toEqual([1, 2])
  })
})
