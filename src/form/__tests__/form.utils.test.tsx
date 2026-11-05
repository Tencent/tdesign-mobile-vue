import { describe, expect, it, vi } from 'vitest';
import { isValueEmpty, validateOneRule, validate } from '../form-model';
import { requestSubmit } from '../form';

describe('Form utils', () => {
  describe('isValueEmpty', () => {
    it('recognizes empty scalar and collection values', () => {
      expect(isValueEmpty('')).toBe(true);
      expect(isValueEmpty(undefined)).toBe(true);
      expect(isValueEmpty(null)).toBe(true);
      expect(isValueEmpty([])).toBe(true);
      expect(isValueEmpty({})).toBe(true);
    });

    it('preserves zero, false, Date and populated values', () => {
      expect(isValueEmpty(0)).toBe(false);
      expect(isValueEmpty(false)).toBe(false);
      expect(isValueEmpty(new Date(2026, 0, 1))).toBe(false);
      expect(isValueEmpty('value')).toBe(false);
      expect(isValueEmpty([0])).toBe(false);
      expect(isValueEmpty({ value: '' })).toBe(false);
    });
  });

  describe('validateOneRule', () => {
    it('returns success when a rule contains only metadata', async () => {
      expect(await validateOneRule('value', { message: '规则提示' })).toEqual({ result: true });
    });

    it('skips optional empty values but validates required fields and custom validators', async () => {
      expect(await validateOneRule('', { email: true })).toEqual({ result: true });
      expect(await validateOneRule('', { required: true })).toEqual({ required: true, result: false });
      expect(await validateOneRule(false, { required: true })).toEqual({ required: true, result: true });
      expect(await validateOneRule(0, { required: true })).toEqual({ required: true, result: true });
      const validator = vi.fn(() => false);
      expect(await validateOneRule('', { validator })).toEqual({ validator, result: false });
      expect(validator).toHaveBeenCalledWith('');
    });

    it('validates dates with default and explicit delimiter rules', async () => {
      expect(await validateOneRule('2026/01/02', { date: true })).toMatchObject({ result: true });
      expect(await validateOneRule('invalid', { date: true })).toMatchObject({ result: false });
      expect(
        await validateOneRule('2026-01-02', { date: { format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-'] } }),
      ).toMatchObject({ result: true });
    });

    it('validates email and URL options', async () => {
      expect(await validateOneRule('test@example.com', { email: { require_tld: true } })).toMatchObject({
        result: true,
      });
      expect(await validateOneRule('test@example', { email: { require_tld: true } })).toMatchObject({ result: false });
      expect(await validateOneRule('https://example.com', { url: { require_protocol: true } })).toMatchObject({
        result: true,
      });
      expect(await validateOneRule('example.com', { url: { require_protocol: true } })).toMatchObject({
        result: false,
      });
    });

    it('counts Chinese characters as two and compares numeric limits numerically', async () => {
      expect(await validateOneRule('中文a', { len: 5 })).toMatchObject({ result: true });
      expect(await validateOneRule('中文a', { max: 4 })).toMatchObject({ result: false });
      expect(await validateOneRule('中文a', { min: 6 })).toMatchObject({ result: false });
      expect(await validateOneRule(5, { max: 4 })).toMatchObject({ result: false });
      expect(await validateOneRule(5, { min: 4 })).toMatchObject({ result: true });
      expect(await validateOneRule(0, { max: 0 })).toMatchObject({ result: true });
    });

    it('accepts RegExp and string patterns', async () => {
      expect(await validateOneRule('abc', { pattern: /^a/ })).toMatchObject({ result: true });
      expect(await validateOneRule('abc', { pattern: '^b' })).toMatchObject({ result: false });
    });

    it('returns custom async results without losing message or status', async () => {
      const result = { result: true, message: '校验成功', type: 'success' as const };
      expect(await validateOneRule('value', { validator: () => Promise.resolve(result) })).toEqual(result);
      const error = new Error('校验异常');
      await expect(validateOneRule('value', { validator: () => Promise.reject(error) })).rejects.toBe(error);
    });
  });

  describe('validate', () => {
    it('preserves rule order when async validators resolve out of order', async () => {
      let resolveFirst: (value: boolean) => void;
      const first = {
        validator: () =>
          new Promise<boolean>((resolve) => {
            resolveFirst = resolve;
          }),
        message: '第一条',
      };
      const second = { validator: () => Promise.resolve(false), message: '第二条' };
      const result = validate('value', [first, second]);
      resolveFirst(true);
      expect(await result).toEqual([
        { ...first, result: true },
        { ...second, result: false },
      ]);
      expect(await validate('value', [])).toEqual([]);
    });
  });

  describe('requestSubmit', () => {
    it('rejects non-form elements', () => {
      expect(() => requestSubmit(document.createElement('div') as unknown as HTMLFormElement)).toThrow(
        'target must be HTMLFormElement',
      );
    });

    it('dispatches submit and removes the temporary submitter', () => {
      const form = document.createElement('form');
      const submit = vi.fn((event: Event) => event.preventDefault());
      form.addEventListener('submit', submit);
      document.body.appendChild(form);
      try {
        requestSubmit(form);
        expect(submit).toHaveBeenCalledTimes(1);
        expect(form.children).toHaveLength(0);
      } finally {
        form.remove();
      }
    });
  });
});
