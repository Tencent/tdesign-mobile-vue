import { isNumber } from 'lodash-es';
import config from '../config';

const { prefix } = config;

export function toCamel(str: string): string {
  return str.replace(/^\S/, (m) => m.toUpperCase());
}

export const isBrowser = typeof window !== 'undefined';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // eslint-disable-line

export const uniqueFactory = (compName: string) => {
  let number = 0;
  return () => `${prefix}-${compName}_${number++}`;
};

export const convertUnit = (val: string | number | undefined) => {
  if (val == null) return 0;
  return isNumber(val) ? `${val}px` : val;
};

export const reconvertUnit = (val: string | number | undefined) => {
  if (val == null) return 0;
  return isNumber(val) ? Number(val) : Number(val.slice(0, -2));
};

/**
 * 格式化数字
 * @param value 传入的数字字符串
 * @param allowDecimal 是否允许小数，默认为 true
 * @param allowNegative 是否允许负数，默认为 true
 * @returns 返回格式化后的数字字符串
 */
export const formatNumber = (value: string, allowDecimal = true, allowNegative = true) => {
  if (allowDecimal) {
    const index = value.indexOf('.');
    if (index !== -1) {
      value = `${value.slice(0, index + 1)}${value.slice(index).replace(/\./g, '')}`;
    }
  } else {
    const [splitValue = ''] = value.split('.');
    value = splitValue;
  }

  if (allowNegative) {
    const index = value.indexOf('-');
    if (index !== -1) {
      value = `${value.slice(0, index + 1)}${value.slice(index).replace(/-/g, '')}`;
    }
  } else {
    value = value.replace(/-/g, '');
  }

  return value.replace(/[^\d.-]/g, '');
};
