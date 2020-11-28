
/**
 * @description: 判断集合是否包含指定内容
 * @return 是否包含 | 位置索引
 */
export function isIncluded(
  v: string | number,
  set: any[] | string | number,
  withIndex: boolean, // 仅针对数组集合；非数组集合，返回 true/false
):boolean | number {
  // 0 '0' 相等
  const reg = new RegExp(`^${!v && v !== 0 ? '' : v}$`);
  if (typeof set === 'object') {
    const i = set.findIndex(s => reg.test(s));
    return withIndex ? i : i > -1;
  }
  return reg.test(set);
}

export function isFalsy(v) {
  return !v && v !== 0;
}

/**
 * @description: 切换数组元素
 */
export function toggleElem(
  v: string | number, // 要切换的元素
  set: any[] | string | number, // 集合
  multiple: boolean, // 是否多选
  keepOne: boolean, // 是否保留一个
): any[] | string | number {
  // 判断是否要返回数组
  // 多选 | 集合为 array/proxy等
  const toReturnArray: boolean = !!multiple || (!!set && typeof set === 'object');

  // 统一数组处理(可监听的数组Proxy类，也支持数组操作)
  let arr: any[] = [];
  if (!isFalsy(set)) {
    if (typeof set === 'object') {
      arr = Array.from(set);
    } else {
      arr = [set];
    }
  }
  const arrLen: number = arr.length;

  // 预设 集合按原类型(多选除外)返回
  const returnFn = (v: any[]) => (!toReturnArray ? v[0] : v);
  const i = isIncluded(v, arr, true);

  // 元素存在
  if (i > -1) {
    // 限制保留一个，且只剩下最后一个
    if (arrLen < 2 && keepOne) {
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
