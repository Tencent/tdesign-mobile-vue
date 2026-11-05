import { describe, expect, it } from 'vitest';
import { findIndex, isFalsy, toArray } from '../util';

describe('Collapse utils', () => {
  describe('findIndex', () => {
    it('matches numeric and string identifiers', () => {
      expect(findIndex(0, ['0', 'one'])).toBe(0);
      expect(findIndex('1', [0, 1])).toBe(1);
      expect(findIndex('missing', [0, 1])).toBe(-1);
      expect(findIndex('one', undefined)).toBe(-1);
    });
  });

  describe('isFalsy', () => {
    it('treats zero as a valid identifier', () => {
      expect(isFalsy(0)).toBe(false);
      expect(isFalsy('one')).toBe(false);
      expect(isFalsy(undefined)).toBe(true);
      expect(isFalsy(null)).toBe(true);
      expect(isFalsy('')).toBe(true);
      expect(isFalsy(false)).toBe(true);
    });
  });

  describe('toArray', () => {
    it('normalizes empty, scalar and iterable inputs', () => {
      expect(toArray(undefined)).toEqual([]);
      expect(toArray(null)).toEqual([]);
      expect(toArray('')).toEqual([]);
      expect(toArray(0)).toEqual([0]);
      expect(toArray('one')).toEqual(['one']);
      expect(toArray(['one', 2])).toEqual(['one', 2]);
      expect(toArray(new Set(['one', 'two']))).toEqual(['one', 'two']);
    });
  });
});
