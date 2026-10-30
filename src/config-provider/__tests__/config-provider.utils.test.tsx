import { describe, it, expect } from 'vitest';
import { t } from '../useConfig';
import { mergeWith } from '../context';

describe('ConfigProvider utils', () => {
  describe('t', () => {
    it('string pattern', () => {
      expect(t('{a}', { a: 'hello' })).toBe('hello');
    });

    it('empty data', () => {
      expect(t('{a}')).toBe('{a}');
    });

    it('function pattern', () => {
      expect(t(() => 'a')).toBe('a');
      expect(t((a, b) => `${a}${b}`, 'hello ', 'tdesign')).toBe('hello tdesign');
    });

    it('other type', () => {
      expect(t(null)).toBe('');
    });
  });

  describe('mergeWith', () => {
    it('array type', () => {
      expect(mergeWith({ a: ['1'] }, { a: 1 })).toStrictEqual({ a: 1 });
    });

    it('object type', () => {
      expect(mergeWith({ a: { b: 1, c: 3 } }, { a: { b: 2 } })).toStrictEqual({ a: { b: 2, c: 3 } });
    });
  });
});
