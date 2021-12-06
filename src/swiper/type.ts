/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-28 12:23:24
 * */

export interface TdSwiperProps {
  /**
   * 轮播切换动画效果类型
   * @default slide
   */
  animation: 'slide';
  /**
   * 是否自动播放
   * @default true
   */
  autoplay: boolean;
  /**
   * 当前轮播在哪一项（下标）
   */
  current: number;
  /**
   * 当前轮播在哪一项（下标），非受控属性
   */
  defaultCurrent: number;
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   * @default horizontal
   */
  direction: 'horizontal' | 'vertical';
  /**
   * 滑动动画时长
   * @default 300
   */
  duration: number;
  /**
   * 当使用垂直方向滚动时的高度
   */
  height: number;
  /**
   * 轮播间隔时间
   * @default 5000
   */
  interval: number;
  /**
   * 导航配置。`navigation.type` 表示导航器风格，圆点/分式等，没有值则不显示。`navigation.minShowNum` 表示小于这个数字不会显示导航器。`navigation.showSlideBtn` 表示是否显示两侧的滑动控制按钮
   */
  navigation: Navigation;
  /**
   * 轮播切换时触发
   */
  onChange: (current: number, context: { source: SwiperChangeSource }) => void;
}

export interface Navigation {
  type?: NavigationVariant;
  minShowNum?: number;
  showSlideBtn?: boolean;
}

export type NavigationVariant = 'dots' | 'dots-bar' | 'fraction';

export type SwiperChangeSource = 'autoplay' | 'touch' | '';
