import { ExtractPropTypes, PropType } from 'vue';

export type ProgressType = 'info' | 'error';

export type ProgressPropsType = ExtractPropTypes<typeof progressProps>;

export const progressProps = {
  /**
   * @description 百分比
   * @attribute percentage
   */
  percentage: {
    type: Number,
    default: 0,
  },
  /**
   * @description 是否显示百分比文本
   * @attribute showText
   */
  showText: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 进度条的颜色
   * @attribute color
   */
  color: {
    type: String,
    default: '',
  },
  /**
   * @description 进度条的背景色
   * @attribute bgColor
   */
  bgColor: {
    type: String,
    default: '',
  },
  /**
   * @description 百分比文本颜色
   * @attribute textColor
   */
  textColor: {
    type: String,
    default: '',
  },
  /**
   * @description 类型
   * @attribute type
   */
  type: {
    type: String as PropType<ProgressType>,
    default: 'info',
  },
};
