/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCalendarProps } from './type';
import { PropType } from 'vue';
import { timestamp } from '@vueuse/core';

export default {
  /**
   * 控制日历显示隐藏
   */
  visible: {
    type: Boolean,
  },
  // 按钮颜色
  bgColor: {
    type: String,
    default: '#0053DB',
  },
  /**
   * 确认按钮
   */
  confirmBtn: {
    type: String,
    default: '确认',
  },
  /**
   * 第一天从星期几开始，仅在日历展示维度为月份时（mode = month）有效。默认为 1
   */
  firstDayOfWeek: {
    type: Number,
  },
  /**
   * 头部插槽（左上角处，默认不显示任何内容）
   */
  title: {
    type: String,
  },
  /**
   * 当前高亮的日期
   */
  value: {
    type: Number,
  },
  minDate: {
    type: Number,
    default: null,
  },
  maxDate: {
    type: Number,
    default: null,
  },
  onSelect: {
    type: Function,
  },
  format: {
    type: Function,
  },
  type: {
    type: String,
    default: 'single',
  },
};
