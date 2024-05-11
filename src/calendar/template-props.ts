/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TdCalendarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。 */
  confirmBtn: {
    type: [String, Object, Function] as PropType<TdCalendarProps['confirmBtn']>,
    default: '',
  },
  /** 标题，不传默认为“请选择日期” */
  title: {
    type: [String, Function, Object] as PropType<TdCalendarProps['title']>,
  },
};
