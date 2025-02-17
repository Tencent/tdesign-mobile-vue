/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdColorPickerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自动关闭。在点击遮罩层时自动关闭，不需要手动设置 visible */
  autoClose: {
    type: Boolean,
    default: true,
  },
  /** 是否可清空 */
  clearable: Boolean,
  /** 是否开启透明通道 */
  enableAlpha: Boolean,
  /** 底部插槽，仅在 `usePopup` 为 `true` 时有效 */
  footer: {
    type: Function as PropType<TdColorPickerProps['footer']>,
  },
  /** 格式化色值。`enableAlpha` 为真时，`RGBA/HSLA/HSVA` 等值有效 */
  format: {
    type: String as PropType<TdColorPickerProps['format']>,
    default: 'RGB' as TdColorPickerProps['format'],
    validator(val: TdColorPickerProps['format']): boolean {
      if (!val) return true;
      return ['RGB', 'RGBA', 'HSL', 'HSLA', 'HSB', 'HSV', 'HSVA', 'HEX', 'CMYK', 'CSS'].includes(val);
    },
  },
  /** 顶部插槽，仅在 `usePopup` 为 `true` 时有效 */
  header: {
    type: Function as PropType<TdColorPickerProps['header']>,
  },
  /** 透传 Popup 组件全部属性 */
  popupProps: {
    type: Object as PropType<TdColorPickerProps['popupProps']>,
    default: () => ({}),
  },
  /** 系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色 */
  swatchColors: {
    type: Array as PropType<TdColorPickerProps['swatchColors']>,
  },
  /** 颜色选择器类型。（base 表示仅展示系统预设内容; multiple 表示展示色板和系统预设内容 */
  type: {
    type: String as PropType<TdColorPickerProps['type']>,
    default: 'base' as TdColorPickerProps['type'],
    validator(val: TdColorPickerProps['type']): boolean {
      if (!val) return true;
      return ['base', 'multiple'].includes(val);
    },
  },
  /** 是否使用弹出层包裹颜色选择器 */
  usePopup: Boolean,
  /** 色值 */
  value: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  /** 色值，非受控属性 */
  defaultValue: {
    type: String,
    default: '',
  },
  /** 是否显示颜色选择器。`usePopup` 为 true 时有效 */
  visible: Boolean,
  /** 选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.color` 表示当前调色板控制器的色值，`context.trigger` 表示触发颜色变化的来源 */
  onChange: Function as PropType<TdColorPickerProps['onChange']>,
  /** 关闭按钮时触发 */
  onClose: Function as PropType<TdColorPickerProps['onClose']>,
  /** 调色板控制器的值变化时触发，`context.color` 指调色板控制器的值 */
  onPaletteBarChange: Function as PropType<TdColorPickerProps['onPaletteBarChange']>,
};
