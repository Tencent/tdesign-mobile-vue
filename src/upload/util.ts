import { SizeUnit } from './type';
/**
 * [*] 表示方法采用这种方式
 * [x] 表示方法不采用这种方式
 *
 * [x] bit      位              b     0 or 1
 * [*] byte     字节            B     8 bits
 * [x] kilobit  千位            kb    1000 bites
 * [*] kilobyte 千字节(二进制)   KB    1024 bytes
 * [x] kilobyte 千字节(十进制)   KB    1000 bytes
 * [x] Megabite 百万位          Mb    1000 kilobits
 * [*] Megabyte 兆字节(二进制)   KB    1024 kilobytes
 * [*] Megabyte 兆字节(十进制)   KB    1000 kilobytes
 * [x] Gigabit  万亿位          Gb    1000 Megabite
 * [*] Gigabyte 吉字节(二进制)   GB    1024 Megabytes
 * [x] Gigabyte 吉字节(十进制)   GB    1000 Megabytes
 */

// 各个单位和 KB 的关系
const SIZE_MAP = {
  B: 1024,
  KB: 1,
  MB: 1048576, // 1024 * 1024
  GB: 1073741824, // 1024 * 1024 * 1024
};

/**
 * 大小比较
 * @param size 文件大小
 * @param unit 计算机计量单位
 */
export function isOverSizeLimit(fileSize: number, sizeLimit: number, unit: SizeUnit) {
  // 以 KB 为单位进行比较
  const units = ['B', 'KB', 'MB', 'GB'];
  const KB_INDEX = 1;
  let index = units.indexOf(unit);
  if (index === -1) {
    console.warn(`TDesign Upload Warn: \`sizeLimit.unit\` can only be one of ${units.join()}`);
    index = KB_INDEX;
  }
  const num = SIZE_MAP[unit];
  const limit = index < KB_INDEX ? sizeLimit / num : sizeLimit * num;
  return fileSize <= limit;
}
