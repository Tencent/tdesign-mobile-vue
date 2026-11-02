import { describe, expect, it } from 'vitest';
import { getMonthByOffset, getYearByOffset, getPrevMonth, getNextMonth, getPrevYear, getNextYear } from '../utils';

describe('Calendar utils', () => {
  it('getMonthByOffset', () => {
    const date = new Date(2022, 0, 15);
    expect(getMonthByOffset(date, 2)).toEqual(new Date(2022, 2, 1));
    expect(getMonthByOffset(date, -1)).toEqual(new Date(2021, 11, 1));
    expect(date).toEqual(new Date(2022, 0, 15));
  });

  it('getYearByOffset', () => {
    const date = new Date(2022, 5, 15);
    expect(getYearByOffset(date, 2)).toEqual(new Date(2024, 5, 1));
    expect(getYearByOffset(date, -1)).toEqual(new Date(2021, 5, 1));
    expect(date).toEqual(new Date(2022, 5, 15));
  });

  it('getPrevMonth', () => {
    expect(getPrevMonth(new Date(2022, 0, 1))).toEqual(new Date(2021, 11, 1));
  });

  it('getNextMonth', () => {
    expect(getNextMonth(new Date(2022, 11, 1))).toEqual(new Date(2023, 0, 1));
  });

  it('getPrevYear', () => {
    expect(getPrevYear(new Date(2022, 5, 1))).toEqual(new Date(2021, 5, 1));
  });

  it('getNextYear', () => {
    expect(getNextYear(new Date(2022, 5, 1))).toEqual(new Date(2023, 5, 1));
  });
});
