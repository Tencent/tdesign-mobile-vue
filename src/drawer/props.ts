/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDrawerProps } from './type';
import { PropType } from 'vue';

export default {
  // /** 抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  // attach: {
  //   type: [String, Function] as PropType<TdDrawerProps['attach']>,
  //   default: '',
  // },
  // /** 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件 */
  // cancelBtn: {
  //   type: [String, Object, Function] as PropType<TdDrawerProps['cancelBtn']>,
  //   default: '',
  // },
  // /** 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例 */
  // closeBtn: {
  //   type: [String, Boolean, Function] as PropType<TdDrawerProps['closeBtn']>,
  //   default: true,
  // },
  // /** 点击蒙层时是否触发抽屉关闭事件 */
  // closeOnOverlayClick: {
  //   type: Boolean,
  //   default: true,
  // },
  // /** 确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件 */
  // confirmBtn: {
  //   type: [String, Object, Function] as PropType<TdDrawerProps['confirmBtn']>,
  //   default: '',
  // },
  // /** 抽屉关闭时是否销毁节点 */
  // destroyOnClose: Boolean,
  /** 抽屉里的列表项 */
  items: {
    type: Array as PropType<TdDrawerProps['items']>,
  },
  /** 展开方式，有两种：直接展示在内容上方 和 推开内容区域 */
  // mode: {
  //   type: String as PropType<TdDrawerProps['mode']>,
  //   default: 'overlay' as TdDrawerProps['mode'],
  //   validator(val: TdDrawerProps['mode']): boolean {
  //     if (!val) return true;
  //     return ['overlay', 'push'].includes(val);
  //   },
  // },
  /** 抽屉方向 */
  placement: {
    type: String as PropType<TdDrawerProps['placement']>,
    default: 'right' as TdDrawerProps['placement'],
    validator(val: TdDrawerProps['placement']): boolean {
      if (!val) return true;
      return ['left', 'right', 'top', 'bottom'].includes(val);
    },
  },
  // /** 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative */
  // showInAttachedElement: Boolean,
  /** 是否显示遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  // /** 尺寸，支持 'small', 'medium', 'large'，'35px', '30%',  '3em' 等。纵向抽屉调整的是抽屉宽度，横向抽屉调整的是抽屉高度 */
  // size: {
  //   type: String,
  //   default: 'small',
  // },
  /** 组件是否可见 */
  visible: Boolean,
  /** 抽屉层级，样式默认为 1500 */
  zIndex: {
    type: Number,
  },
  /** 关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发 */
  onClose: Function as PropType<TdDrawerProps['onClose']>,
  /** 点击抽屉里的列表项 */
  onItemClick: Function as PropType<TdDrawerProps['onItemClick']>,
  /** 如果蒙层存在，点击蒙层时触发 */
  onOverlayClick: Function as PropType<TdDrawerProps['onOverlayClick']>,
};
