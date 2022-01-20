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

export function toCamel(str: string): string {
  return str.replace(/^\S/, (m) => m.toUpperCase());
}

/**
 * 计算字符串字符的长度并可以截取字符串。
 * @param str 传入字符串
 * @param maxCharacter 规定最大字符串长度
 * @returns 当没有传入maxCharacter时返回字符串字符长度，当传入maxCharacter时返回截取之后的字符串和长度。
 */
export function getCharacterLength(str: string, maxCharacter?: number) {
  const hasMaxCharacter = typeof maxCharacter === 'number';
  if (!str || str.length === 0) {
    if (hasMaxCharacter) {
      return {
        length: 0,
        characters: str,
      };
    }
    return 0;
  }
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    let currentStringLength = 0;
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      currentStringLength = 2;
    } else {
      currentStringLength = 1;
    }
    if (hasMaxCharacter && len + currentStringLength > maxCharacter) {
      return {
        length: len,
        characters: str.slice(0, i),
      };
    }
    len += currentStringLength;
  }
  if (hasMaxCharacter) {
    return {
      length: len,
      characters: str,
    };
  }
  return len;
}
