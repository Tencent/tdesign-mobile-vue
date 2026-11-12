import { describe, it, expect } from 'vitest';
import { t } from '../useConfig';
import { mergeWith } from '../context';
import type { GlobalConfigProvider } from '../type';

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
      expect(t((a: string, b: string) => `${a}${b}`, 'hello ', 'tdesign')).toBe('hello tdesign');
    });

    it('other type', () => {
      expect(t(null)).toBe('');
    });
  });

  describe('mergeWith', () => {
    it('array type', () => {
      // 传入含自定义键的配置属于有意行为，此处放宽输入类型以校验合并逻辑
      const defaultConfig: GlobalConfigProvider & Record<string, unknown> = { a: ['1'] };
      const injectConfig: GlobalConfigProvider & Record<string, unknown> = { a: 1 };
      expect(mergeWith(defaultConfig, injectConfig)).toStrictEqual({ a: 1 });
    });

    it('object type', () => {
      const defaultConfig: GlobalConfigProvider & Record<string, unknown> = { a: { b: 1, c: 3 } };
      const injectConfig: GlobalConfigProvider & Record<string, unknown> = { a: { b: 2 } };
      expect(mergeWith(defaultConfig, injectConfig)).toStrictEqual({ a: { b: 2, c: 3 } });
    });
  });
});
