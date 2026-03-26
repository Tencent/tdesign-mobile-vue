/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSwiperProps } from './type';
import { PropType } from 'vue';

export default {
  /** 轮播切换动画效果类型 */
  animation: {
    type: String as PropType<TdSwiperProps['animation']>,
    default: 'slide' as TdSwiperProps['animation'],
    validator(val: TdSwiperProps['animation']): boolean {
      if (!val) return true;
      return ['slide'].includes(val);
    },
  },
  /** 是否自动播放 */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /** 当前轮播在哪一项（下标） */
  current: {
    type: Number,
    default: undefined,
  },
  modelValue: {
    type: Number,
    default: undefined,
  },
  /** 当前轮播在哪一项（下标），非受控属性 */
  defaultCurrent: {
    type: Number,
    default: 0,
  },
  /** 轮播滑动方向，包括横向滑动和纵向滑动两个方向 */
  direction: {
    type: String as PropType<TdSwiperProps['direction']>,
    default: 'horizontal' as TdSwiperProps['direction'],
    validator(val: TdSwiperProps['direction']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 滑动动画时长 */
  duration: {
    type: Number,
    default: 300,
  },
  /** 轮播的高度 */
  height: {
    type: [String, Number] as PropType<TdSwiperProps['height']>,
  },
  /** 轮播间隔时间 */
  interval: {
    type: Number,
    default: 5000,
  },
  /** 是否循环播放 */
  loop: {
    type: Boolean,
    default: true,
  },
  /** 导航器全部配置 */
  navigation: {
    type: [Object, Function] as PropType<TdSwiperProps['navigation']>,
  },
  /** 【开发中】后边距，可用于露出后一项的一小部分。默认单位 `px` */
  nextMargin: {
    type: [String, Number] as PropType<TdSwiperProps['nextMargin']>,
    default: 0 as TdSwiperProps['nextMargin'],
  },
  /** 【开发中】前边距，可用于露出前一项的一小部分。默认单位 `px` */
  previousMargin: {
    type: [String, Number] as PropType<TdSwiperProps['previousMargin']>,
    default: 0 as TdSwiperProps['previousMargin'],
  },
  /** 轮播切换时触发 */
  onChange: Function as PropType<TdSwiperProps['onChange']>,
  /** 点击轮播项时触发 */
  onClick: Function as PropType<TdSwiperProps['onClick']>,
};
