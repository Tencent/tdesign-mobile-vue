/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdStepsProps } from './type';
import { PropType } from 'vue';

export default {
  /** 当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成 */
  current: {
    type: [String, Number] as PropType<TdStepsProps['current']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number] as PropType<TdStepsProps['current']>,
    default: undefined,
  },
  /** 当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成，非受控属性 */
  defaultCurrent: {
    type: [String, Number] as PropType<TdStepsProps['defaultCurrent']>,
  },
  /** 用于控制 current 指向的步骤条的状态 */
  currentStatus: {
    type: String as PropType<TdStepsProps['currentStatus']>,
    default: 'process' as TdStepsProps['currentStatus'],
    validator(val: TdStepsProps['currentStatus']): boolean {
      if (!val) return true;
      return ['default', 'process', 'finish', 'error'].includes(val);
    },
  },
  /** 步骤条方向，有两种：横向和纵向 */
  layout: {
    type: String as PropType<TdStepsProps['layout']>,
    default: 'horizontal' as TdStepsProps['layout'],
    validator(val: TdStepsProps['layout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 只读状态 */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /** 步骤条顺序 */
  sequence: {
    type: String as PropType<TdStepsProps['sequence']>,
    default: 'positive' as TdStepsProps['sequence'],
    validator(val: TdStepsProps['sequence']): boolean {
      if (!val) return true;
      return ['positive', 'reverse'].includes(val);
    },
  },
  /** 步骤条风格 */
  theme: {
    type: String as PropType<TdStepsProps['theme']>,
    default: 'default' as TdStepsProps['theme'],
    validator(val: TdStepsProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'dot'].includes(val);
    },
  },
  /** 当前步骤发生变化时触发 */
  onChange: Function as PropType<TdStepsProps['onChange']>,
};
