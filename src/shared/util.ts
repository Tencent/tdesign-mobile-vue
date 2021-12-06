export function isArray(x: unknown): boolean {
  return Array.isArray(x);
}

export function isNumber(x: unknown): boolean {
  return Object.prototype.toString.call(x) === '[object Number]';
}

export function isString(x: unknown): boolean {
  return typeof x === 'string';
}

export function isBoolean(x: unknown): boolean {
  return typeof x === 'boolean';
}

export function isNull(s: unknown): boolean {
  return s === null;
}

export function isObject(x: unknown): boolean {
  return x === null ? false : Object.prototype.toString.call(x) === '[object Object]';
}

export function isDate(x: unknown): x is Date {
  return Object.prototype.toString.call(x) === '[object Date]';
}

export function isFunction(x: unknown): boolean {
  return Object.prototype.toString.call(x) === '[object Function]';
}
