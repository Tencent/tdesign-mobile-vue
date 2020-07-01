export interface IDialogProps {
  theme: string,
  showTitle: boolean,
  title: string,
  tips: string,
  type: string,
  showFooter: boolean,
  placeholderText: string,
  confirmButtonText: string,
  cancelButtonText: string,
  isInput: boolean,
  isShowDialog: boolean,
  knowButtonText: string,
  inputValue: string,
};

export const DialogProps = {
  /**
   * @description 主题
   * @property title
   */
  theme: {
    type: String,
    default: 'default',
  },
  /**
   * @description 是否显示标题
   * @property showTitle
   */
  showTitle: {
    type: Boolean,
    default: true,
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
   * @description 提示文案
   * @property tips
   */
  tips: {
    type: String,
    default: '',
  },
  /**
   * @description 提示框类型，confirm-确认框，默认是反馈类
   * @property type
   */
  type: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示底部按钮
   * @property showFooter
   */
  showFooter: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 输入框默认文案
   * @property placeholderText
   */
  placeholderText: {
    type: String,
    default: '',
  },
  /**
   * @description 取消按钮文字
   * @property cancelButtonText
   */
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  /**
   * @description 确定按钮文字
   * @property confirmButtonText
   */
  confirmButtonText: {
    type: String,
    default: '确认',
  },
  /**
   * @description 我知道了按钮文字
   * @property sureButtonText
   */
  sureButtonText: {
    type: String,
    default: '我知道了',
  },
  /**
   * @description 是否含输入框
   * @property isInput
   */
  isInput: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示弹出框
   * @property isShowDialog
   */
  isShowDialog: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 输入框输入内容
   * @property inputValue
   */
  inputValue: {
    type: String,
    default: '{}',
  },
};
