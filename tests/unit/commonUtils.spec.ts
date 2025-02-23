import { describe, it, expect } from 'vitest';
import { zipMultiple, zipMultipleWithPadding } from '../../src/utils/common';

describe('zipMultiple', () => {
  it('should zip multiple arrays', () => {
    const result = zipMultiple([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect(result).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('should zip multidimensional arrays', () => {
    const input = [[1, 2, 3], [4, 5, 6]]
    const result = zipMultiple(...input)
    expect(result).toEqual([[1, 4], [2, 5], [3, 6]]);
  })

  it('should zip multiple arrays with different lengths', () => {
    const result = zipMultiple([1, 2, 3], [4, 5, 6, 7], [8, 9])
    expect(result).toEqual([[1, 4, 8], [2, 5, 9]])
  })
})

describe('zipMultipleWithPadding', () => {
  it('should zip multiple arrays with different lengths', () => {
    const result = zipMultipleWithPadding([1, 2, 3], [4, 5, 6, 7], [8, 9])
    expect(result).toEqual([[1, 4, 8], [2, 5, 9], [3, 6, null], [null, 7, null]])
  })

  it('should zip multidimensional arrays', () => {
    const result = zipMultipleWithPadding(...[[1, 2, 3], [4, 5, 6]])
    expect(result).toEqual([[1, 4], [2, 5], [3, 6]])
  })
})