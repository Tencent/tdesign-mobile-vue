import { Color } from '../_common/js/color-picker';
import { DEFAULT_SYSTEM_SWATCH_COLORS } from '../_common/js/color-picker/constants';
import type { TdColorPickerProps as ColorPickerProps } from './type';

export const getCoordinate = (e: TouchEvent, rect: DOMRect, isFixed?: boolean) => {
  const { pageX, pageY, clientY } = e?.changedTouches?.[0] || {};
  return {
    x: Math.min(Math.max(0, pageX - rect.left), rect.width),
    y: Math.min(Math.max(0, (isFixed ? clientY : pageY) - rect.top), rect.height),
  };
};

export const getFormatList = (format: ColorPickerProps['format'], color: Color) => {
  const FORMAT_MAP = {
    HSV: Object.values(color.getHsva()),
    HSVA: Object.values(color.getHsva()),

    HSL: Object.values(color.getHsla()),
    HSLA: Object.values(color.getHsla()),
    HSB: Object.values(color.getHsla()),

    RGB: Object.values(color.getRgba()),
    RGBA: Object.values(color.getRgba()),
    CMYK: [...Object.values(color.getCmyk()), 0],
    HEX8: [color.hex8, 0],

    CSS: [color.css, 0],
    HEX: [color.hex, 0],
  };

  const cur = FORMAT_MAP[format];
  if (cur) {
    return [...cur.slice(0, cur.length - 1), `${Math.round(color.alpha * 100)}%`];
  }
  return FORMAT_MAP.RGB;
};

export const genSwatchList = (prop: ColorPickerProps['swatchColors']) => {
  if (prop === undefined) {
    return DEFAULT_SYSTEM_SWATCH_COLORS.slice(0, 10);
  }
  if (!prop || !prop.length) {
    return [];
  }
  return prop;
};
