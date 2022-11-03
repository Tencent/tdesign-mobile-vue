/**
 * @description: 判断集合是否包含指定内容
 * @return 是否包含 | 位置索引
 */
export function findIndex(v: unknown, set: unknown): number {
  // 正则方式，辨别0='0'
  const reg = new RegExp(`^${!v && v !== 0 ? '' : v}$`);

  // 转数组统一处理
  const arr = toArray(set);
  return arr.findIndex((s) => reg.test(s));
}

/**
 * @description: 判断是否假植 undefined|null|''等
 */
export function isFalsy(v: unknown): boolean {
  return !v && v !== 0;
}

/**
 * @description: 转化为数组
 */
export function toArray(v: unknown): any[] {
  if (isFalsy(v)) return [];
  if (typeof v === 'object') return Array.from(v as Iterable<unknown> | ArrayLike<unknown>);
  return [v];
}
