
/**
 * @description: 判断集合是否包含指定内容
 * @return 是否包含 | 位置索引
 */
export function findIndex(
  v: any,
  set: any,
):number {
  // 正则方式，辨别0='0'
  const reg = new RegExp(`^${!v && v !== 0 ? '' : v}$`);

  // 转数组统一处理
  const arr = toArray(set);
  return arr.findIndex(s => reg.test(s));
}
/**
 * @description: 判断是否假植 undefined|null|''等
 */
export function isFalsy(v: any): boolean {
  return !v && v !== 0;
}

/**
 * @description: 转化为数组
 */
export function toArray(v: any): any[] {
  if (isFalsy(v)) return [];
  if (typeof v === 'object') return Array.from(v);
  return [v];
}

/**
 * @description: 切换数组元素
 */
export function toggleElem(
  v: string | number, // 要切换的元素
  set: any, // 集合
  multiple: boolean, // 是否多选
  atLeastOne = false, // 是否保留一个
): any[] | string | number {
  // 判断是否要返回数组。 多选 | 集合为 array/proxy等需要
  const toReturnArray: boolean = !!multiple || (!!set && typeof set === 'object');

  // 预设 集合按原类型(多选除外)返回
  const returnFn = (v: any[]) => (!toReturnArray ? v[0] : v);

  // 统一数组处理(可监听的数组Proxy类，也支持数组操作)
  const arr: any[] = toArray(set);
  const arrLen: number = arr.length;

  // 元素所在索引
  const i = findIndex(v, arr);

  // 元素存在
  if (i > -1) {
    // 限制保留一个，且只剩下最后一个
    if (arrLen < 2 && atLeastOne) {
      return returnFn(arr);
    }
    // 移除该元素
    arr.splice(i, 1);
    return returnFn(arr);
  }

  // 不存在，增加 / 替换
  if (!multiple && arrLen > 0) {
    // 替换: 不支持多选，且已有1个
    return returnFn([v]);
  }

  // 增加
  arr.push(v);
  return returnFn(arr);
}
