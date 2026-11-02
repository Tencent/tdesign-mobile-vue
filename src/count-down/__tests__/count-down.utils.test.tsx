import { describe, expect, it } from 'vitest';
import { fillZero, getMark, getRemainTimes, getShowTimes } from '../../shared/useCountDown/utils';

describe('CountDown utils', () => {
  describe('getRemainTimes', () => {
    it('converts milliseconds into time units', () => {
      expect(getRemainTimes(90061001)).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 });
      expect(getRemainTimes(0)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
      expect(getRemainTimes(undefined)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    });
  });

  describe('fillZero', () => {
    it('formats seconds and milliseconds separately', () => {
      expect(fillZero(0)).toBe('00');
      expect(fillZero(10)).toBe(10);
      expect(fillZero(1, true)).toBe('001');
      expect(fillZero(10, true)).toBe('010');
      expect(fillZero(100, true)).toBe(100);
    });
  });

  describe('getMark', () => {
    it('returns the separator after a format token', () => {
      expect(getMark('HH:mm:ss', 'HH')).toBe(':');
      expect(getMark('HHmm', 'HH')).toBe('m');
      expect(getMark(undefined, 'HH')).toBeUndefined();
    });
  });

  describe('getShowTimes', () => {
    const times = { days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 5 };

    it('renders token formats and separators', () => {
      expect(getShowTimes(times, 'DD天HH时mm分ss秒')).toEqual([
        { value: '01', mark: '天' },
        { value: '02', mark: '时' },
        { value: '03', mark: '分' },
        { value: '04', mark: '秒' },
      ]);
      expect(getShowTimes(times, 'HH:mm:ss', false, true).map((item) => item.mark)).toEqual(['时', '分', '秒']);
    });

    it('adds milliseconds when requested', () => {
      expect(getShowTimes(times, 'HH:mm:ss', true).at(-1)).toEqual({ value: '005', mark: undefined });
      expect(getShowTimes(times, '中文', false)).toEqual([]);
    });
  });
});
