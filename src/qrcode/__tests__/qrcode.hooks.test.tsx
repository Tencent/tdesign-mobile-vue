import { describe, expect, it } from 'vitest';
import { useQRCode } from '../hooks/useQRCode';
import type { ImageSettings } from '../../_common/js/qrcode/types';

const VALUE = 'https://tdesign.tencent.com/'; // 30 字节内容，L/M/H 级纠错分别对应 version 2/3/4

const createQRCode = (options: Partial<Parameters<typeof useQRCode>[0]> = {}) =>
  useQRCode({
    value: VALUE,
    level: 'M',
    minVersion: 1,
    includeMargin: false,
    size: 160,
    ...options,
  });

describe('useQRCode', () => {
  it('cells', () => {
    const { cells } = createQRCode();
    // 30 字节内容 + M 级纠错 → version 3 → 29 x 29 的模块矩阵
    expect(cells.value.length).eq(29);
    expect(cells.value.every((row) => row.length === 29)).eq(true);
  });

  it('margin & numCells', () => {
    // includeMargin=false 且未传 marginSize → 无边距，numCells 与模块数一致
    const base = createQRCode();
    expect(base.margin.value).eq(0);
    expect(base.numCells.value).eq(base.cells.value.length);

    // includeMargin=true → QR 规范边距 4 模块
    const withMargin = createQRCode({ includeMargin: true });
    expect(withMargin.margin.value).eq(4);
    expect(withMargin.numCells.value).eq(withMargin.cells.value.length + 4 * 2);

    // marginSize 优先于 includeMargin，向下取整且不为负
    const custom = createQRCode({ includeMargin: true, marginSize: 2.9 });
    expect(custom.margin.value).eq(2);
    const negative = createQRCode({ includeMargin: true, marginSize: -1 });
    expect(negative.margin.value).eq(0);
  });

  it('calculatedImageSettings', () => {
    // 未传 imageSettings → null
    expect(createQRCode().calculatedImageSettings.value).eq(null);

    const imageSettings: ImageSettings = {
      src: 'https://tdesign.gtimg.com/site/tdesign-logo.png',
      height: 48,
      width: 48,
      excavate: true,
      crossOrigin: 'anonymous',
    };
    const { cells, calculatedImageSettings } = createQRCode({ imageSettings });
    const numCells = cells.value.length;
    const scale = numCells / 160;
    const cis = calculatedImageSettings.value;
    // 图片尺寸按 (图片像素 / 二维码尺寸) * 模块数 缩放到模块坐标系，x/y 缺省时居中
    expect(cis.w).toBeCloseTo(48 * scale);
    expect(cis.h).toBeCloseTo(48 * scale);
    expect(cis.x).toBeCloseTo(numCells / 2 - cis.w / 2);
    expect(cis.y).toBeCloseTo(numCells / 2 - cis.h / 2);
    // excavate 为 true 时计算图片覆盖的挖孔区域（坐标取整）
    expect(cis.excavation).toEqual({
      x: Math.floor(cis.x),
      y: Math.floor(cis.y),
      w: Math.ceil(cis.w + cis.x - Math.floor(cis.x)),
      h: Math.ceil(cis.h + cis.y - Math.floor(cis.y)),
    });
    expect(cis.opacity).eq(1);
    expect(cis.crossOrigin).eq('anonymous');
  });

  it('calculatedImageSettings falls back to default image size and keeps custom opacity', () => {
    const { calculatedImageSettings } = createQRCode({
      imageSettings: { src: 'icon.png', height: 0, width: 0, excavate: false, opacity: 0.5 },
    });
    const scale = 29 / 160;
    // width/height 为 0 时回退默认图片尺寸：size * 0.1 向下取整 = 16
    expect(calculatedImageSettings.value.w).toBeCloseTo(16 * scale);
    expect(calculatedImageSettings.value.h).toBeCloseTo(16 * scale);
    // excavate 为 false 时不挖孔
    expect(calculatedImageSettings.value.excavation).eq(null);
    expect(calculatedImageSettings.value.opacity).toBeCloseTo(0.5);
  });

  it('qrcode & level', () => {
    // qrcode 为编码结果，getModules 与 cells 一致
    const { qrcode, cells } = createQRCode({ level: 'H' });
    expect(qrcode.value.getModules()).toEqual(cells.value);
    // 纠错级别越高所需版本越高：30 字节内容 H → version 4（33x33），L → version 2（25x25）
    expect(cells.value.length).eq(33);
    expect(createQRCode({ level: 'L' }).cells.value.length).eq(25);
  });
});
