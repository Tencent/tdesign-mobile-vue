import { ExtractPropTypes } from 'vue';

export interface IPickerProps {
  theme: string;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

export const PickerProps = {
  /**
   * @description 主题
   * @property theme
   */
  theme: {
    type: String,
    default: 'default',
  },
  /**
   * @description 标题
   * @property title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 确定按钮文字
   * @property confirmButtonText
   */
  confirmButtonText: {
    type: String,
    default: '',
  },
  /**
   * @description 取消按钮文字
   * @property cancelButtonText
   */
  cancelButtonText: {
    type: String,
    default: '',
  },
};

export type PickerColumnPropsType = ExtractPropTypes<typeof pickerColumnProps>;

export const pickerColumnProps = {
  /**
   * @description 可选项，类似select的列表项
   * @property options
   */
  options: {
    type: Array,
    default: [],
  },
  /**
   * @description 需要显示对象对应的key，当options为对象数组当时候用
   * @property optionKey
   */
  optionKey: {
    type: String,
    default: '',
  },
  /**
   * @description 格式化需要显示当内容
   * @property formatter
   */
  formatter: {
    type: Function,
    default: (value: string): string  => value,
  },
  /**
   * @description 默认选中的索引，默认值为0
   * @property defaultIndex
   */
  defaultIndex: {
    type: Number,
    default: 0,
  },
};

export interface PickerOptions {
  defaultIndex?: number;
  el: HTMLElement | HTMLDivElement | HTMLUListElement;
  onChange: (index: number) => void;
}
