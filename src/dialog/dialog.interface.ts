export interface IDialogProps {
  modelValue?: boolean,
  showTitle?: boolean,
  title?: string,
  content: string,
  type?: string,
  showFooter?: boolean,
  placeholderText?: string,
  confirmContent?: string,
  cancelContent?: string,
  isInput?: boolean,
  visible?: boolean,
  knowContent?: string,
  zIndex?: number,
  showOverlay?: boolean,
  width: '320px',
};

export const DialogPropsDefault = {
  showTitle: true,
  title: '温馨提醒',
  content: '',
  type: '',
  showFooter: true,
  placeholderText: '',
  confirmContent: '确认',
  cancelContent: '取消',
  isInput: false,
  visible: true,
  knowContent: '我知道了',
  zIndex: 2500,
  showOverlay: true,
  width: '320px',
};

export const DialogProps = {
  modelValue: Boolean,
  /**
   * @description 是否显示遮罩层
   * @property showOverlay
   */
  showOverlay: {
    type: Boolean,
    default: true,
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
    default: '温馨提醒',
  },
  /**
   * @description 提示文案
   * @property content
   */
  content: {
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
   * @property cancelContent
   */
  cancelContent: {
    type: String,
    default: '取消',
  },
  /**
   * @description 确定按钮文字
   * @property confirmContent
   */
  confirmContent: {
    type: String,
    default: '确认',
  },
  /**
   * @description 我知道了按钮文字
   * @property knowContent
   */
  knowContent: {
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
   * @property visible
   */
  visible: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 定位层级
   * @property zIndex
   */
  zIndex: {
    type: Number,
    default: 2500,
  },
  /**
   * @description 宽度
   * @property width
   */
  width: {
    type: [Number, String],
    default: '320px',
  },
};
