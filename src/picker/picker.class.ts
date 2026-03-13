import { preventDefault } from '../shared/dom';
import { usePrefixClass } from '../hooks/useClass';
import { PickerColumn, PickerWheelConfig } from './type';
import { KeysType } from '../common';
import { findIndexOfEnabledOption, limitNumberInRange } from './utils';

const classPrefix = usePrefixClass();

export interface PickerOptions {
  defaultIndex?: number;
  keys?: KeysType;
  defaultPickerColumns?: PickerColumn;
  el: HTMLElement | HTMLDivElement | HTMLUListElement;
  onChange: (index: number) => void;
  wheelConfig: Required<PickerWheelConfig>;
}

const quartEaseOut = function (t: number, b: number, c: number, d: number) {
  let tempT = t;
  return -c * ((tempT = tempT / d - 1) * tempT * tempT * tempT - 1) + b;
};

/**
 * constant var
 */
export const DEFAULT_ITEM_HEIGHT = 40;
const DEFAULT_HOLDER_HEIGHT = 200;

/**
 * @name picker
 * @description 阻尼参数来源iscroll5，灵感来自mui.picker
 * @param {[HTMLDivElement]} el   [picker-item的DOM元素]
 * @param {[Function]} onChange   [发生change事件时候的回调]
 * @param {[Number]} defaultIndex [picker-item开始的索引值]
 */
class Picker {
  holder: HTMLElement | HTMLUListElement;

  options: PickerOptions;

  list: HTMLUListElement | null = null;

  elementItems: HTMLLIElement[] = [];

  curIndex = 0;

  itemClassName = '';

  itemSelectedClassName = '';

  itemHeight: number = DEFAULT_ITEM_HEIGHT;

  lastMoveTime = 0;

  lastMoveStart = 0;

  stopInertiaMove = false;

  startY = 0;

  isPicking = false;

  offsetYOfStartBound = 0;

  offsetYOfEndBound = 0;

  offsetY = 0;

  offsetYOfStart = 0;

  offsetYOfEnd = 0;

  curValue: string | null = '';

  onChange: (index: number) => void;

  itemGroupHeight = DEFAULT_HOLDER_HEIGHT;

  indicatorOffset = 0;

  pickerColumns: PickerColumn;

  // wheelConfig 实例属性
  inertiaDuration: number;

  bounceDuration: number;

  transitionDuration: number;

  inertiaTimeThreshold: number;

  inertiaDistanceThreshold: number;

  boundOffset: number;

  clickDistanceThreshold: number;

  clickTimeThreshold: number;

  // ResizeObserver 用于监听尺寸变化
  private resizeObserver: ResizeObserver | null = null;

  // 标记是否已初始化完成高度计算
  private heightInitialized = false;

  constructor(options: PickerOptions) {
    if (!options.el) throw new Error('options el needed!');
    this.holder = options.el;
    this.pickerColumns = options.defaultPickerColumns;
    this.options = options;
    this.onChange = options.onChange;

    // 直接使用传入的 wheelConfig（已由组件合并好默认值）
    const { wheelConfig } = options;
    this.inertiaDuration = wheelConfig.inertiaDuration;
    this.bounceDuration = wheelConfig.bounceDuration;
    this.transitionDuration = wheelConfig.transitionDuration;
    this.inertiaTimeThreshold = wheelConfig.inertiaTimeThreshold;
    this.inertiaDistanceThreshold = wheelConfig.inertiaDistanceThreshold;
    this.boundOffset = wheelConfig.boundOffset;
    this.clickDistanceThreshold = wheelConfig.clickDistanceThreshold;
    this.clickTimeThreshold = wheelConfig.clickTimeThreshold;

    this.init();
  }

  init(): void {
    // 惯性滚动
    this.initScrollParams();
    // item 样式
    this.setSelectedClassName();
    // 绑定事件
    this.bindEvent();
    // 监听尺寸变化，适配 popup 场景和 CSS 变量动态生效
    this.observeResize();
  }

  /**
   * @description 使用 ResizeObserver 监听元素尺寸变化
   */
  observeResize(): void {
    if (typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        // 当高度从 0 变为有效值，或高度发生变化时，重新计算
        if (height > 0) {
          const newItemHeight = this.getFirstItemHeight();
          const newGroupHeight = this.holder.parentElement?.offsetHeight || DEFAULT_HOLDER_HEIGHT;

          // 只有当高度有效且发生变化时才更新
          if (
            newItemHeight > 0 &&
            newGroupHeight > 0 &&
            (newItemHeight !== this.itemHeight || newGroupHeight !== this.itemGroupHeight || !this.heightInitialized)
          ) {
            this.heightInitialized = true;
            this.recalculateHeights();
            // 重新定位到当前选中项
            this.updateIndex(this.curIndex, { isChange: false, duration: 0 });
          }
        }
      }
    });

    // 同时观察 holder 和其父元素
    this.resizeObserver.observe(this.holder);
    if (this.holder.parentElement) {
      this.resizeObserver.observe(this.holder.parentElement);
    }
  }

  /**
   * @description 获取第一个 li 元素的高度，优先使用已缓存的 elementItems
   */
  private getFirstItemHeight(): number {
    const firstItem = this.elementItems[0] || this.holder.querySelector('li');
    return firstItem?.offsetHeight || DEFAULT_ITEM_HEIGHT;
  }

  /**
   * @description 获取所有的列表DOM元素，并重新计算高度相关参数
   */
  updateItems(): void {
    this.elementItems = [...this.holder.querySelectorAll('li')];
    // 重新获取实际高度，以支持 CSS 变量和 postcss-pxtorem 等场景
    this.recalculateHeights();
  }

  /**
   * @description 重新计算高度相关参数，适配 CSS 变量和 rem 转换场景
   */
  recalculateHeights(): void {
    const newItemHeight = this.getFirstItemHeight();
    const newGroupHeight = this.holder.parentElement?.offsetHeight || DEFAULT_HOLDER_HEIGHT;

    // 高度发生变化时更新所有相关参数
    if (newItemHeight !== this.itemHeight || newGroupHeight !== this.itemGroupHeight) {
      this.itemHeight = newItemHeight;
      this.itemGroupHeight = newGroupHeight;
      this.indicatorOffset = this.itemGroupHeight / 2 - this.itemHeight / 2;
    }

    // 边界值需要根据当前 elementItems 数量计算，每次都更新
    const itemLen = this.elementItems.length;
    if (itemLen > 0) {
      this.offsetYOfStart = this.indicatorOffset;
      this.offsetYOfEnd = this.indicatorOffset - (itemLen - 1) * this.itemHeight;
      this.offsetYOfStartBound = this.indicatorOffset + this.boundOffset;
      this.offsetYOfEndBound = this.indicatorOffset - (itemLen - 1) * this.itemHeight - this.boundOffset;
    }
  }

  /**
   * @description 初始化滚动参数
   */
  initScrollParams(): void {
    this.list = this.holder as HTMLUListElement;
    this.elementItems = [...this.holder.querySelectorAll('li')];
    this.itemGroupHeight = this.holder.parentElement?.offsetHeight || DEFAULT_HOLDER_HEIGHT;
    this.itemHeight = this.getFirstItemHeight();
    this.indicatorOffset = this.itemGroupHeight / 2 - this.itemHeight / 2;

    // 设置 class 名称
    this.itemClassName = `${classPrefix.value}-picker-item__item`;
    this.itemSelectedClassName = `${classPrefix.value}-picker-item__item--active`;

    // 处理默认选中索引
    let curIndex = findIndexOfEnabledOption(this.pickerColumns, this.options.defaultIndex || 0, this.options.keys);
    if (curIndex !== (this.options.defaultIndex || 0)) {
      this.onChange(curIndex);
    }

    this.curValue = this.elementItems[curIndex]?.textContent;

    // 使用 Object.defineProperty 确保 curIndex 变化时同步更新 curValue
    Object.defineProperty(this, 'curIndex', {
      set: (value: number) => {
        curIndex = value;
        this.curValue = this.elementItems[value]?.textContent;
      },
      get() {
        return curIndex;
      },
    });

    // 计算初始偏移和边界值
    const itemLen = this.elementItems.length;
    const startOffsetY = this.indicatorOffset - this.curIndex * this.itemHeight;
    this.setOffsetY(startOffsetY);
    this.offsetYOfStart = this.indicatorOffset;
    this.offsetYOfEnd = this.indicatorOffset - (itemLen - 1) * this.itemHeight;
    this.offsetYOfStartBound = this.indicatorOffset + this.boundOffset;
    this.offsetYOfEndBound = this.indicatorOffset - (itemLen - 1) * this.itemHeight - this.boundOffset;
  }

  bindEvent(): void {
    this.holder.addEventListener('touchstart', (e) => this.touchStartHandler(e as TouchEvent), false);
    this.holder.addEventListener('touchmove', (e) => this.touchMoveHandler(e as TouchEvent), false);
    this.holder.addEventListener('touchend', (e) => this.touchEndHandler(e as TouchEvent), false);
    this.holder.addEventListener('touchcancel', (e) => this.touchEndHandler(e as TouchEvent), false);
  }

  touchStartHandler(event: TouchEvent): void {
    preventDefault(event, false);
    this.isPicking = true;
    if (!this.holder) return;
    if (this.list) this.list.style.transition = '';
    this.startY = event.changedTouches[0].pageY;
    this.offsetYOfStart = this.offsetY;
    // 更新惯性参数
    this.updateInertiaParams(event, true);
  }

  getCount() {
    return this.pickerColumns.length;
  }

  getRange(thresholdA = 0, thresholdB = 3) {
    const min = -(this.getCount() - thresholdA) * this.itemHeight;
    const max = thresholdB * this.itemHeight;
    return { min, max };
  }

  touchMoveHandler(event: TouchEvent): void {
    preventDefault(event, false);
    if (!this.isPicking || !this.holder) return;

    const endY = event.changedTouches[0].pageY;
    const dragRange = endY - this.startY;
    this.updateInertiaParams(event, false);

    const { min, max } = this.getRange(0, 5);
    const moveOffsetY = limitNumberInRange(this.offsetYOfStart + dragRange, min, max);
    this.setOffsetY(moveOffsetY);
  }

  touchEndHandler(event: TouchEvent): void {
    preventDefault(event, false);
    this.isPicking = false;
    if (!this.holder) return;
    const point = event.changedTouches[0];
    const nowTime = event.timeStamp || Date.now();

    const moveTime = nowTime - this.lastMoveTime;
    const distance = point.pageY - this.lastMoveStart;
    const absDistance = Math.abs(distance);

    if (absDistance < this.clickDistanceThreshold && moveTime < this.clickTimeThreshold) {
      // 点选操作，查找 li
      const li = (event.target as HTMLElement).closest('li');
      if (li && this.list?.contains(li)) {
        const childElements = this.list.children;
        const rawIndex = Array.from(childElements).indexOf(li);
        const enabledIndex = findIndexOfEnabledOption(this.pickerColumns, rawIndex, this.options.keys);
        this.updateIndex(enabledIndex, { isChange: true });
        return;
      }
    }
    // 超出一定时间不再惯性滚动
    if (moveTime > this.inertiaTimeThreshold || absDistance < this.inertiaDistanceThreshold || !this.inertiaDuration) {
      this.stopInertiaMove = false;
      this.endScroll();
      return;
    }

    const speed = Math.abs(distance / moveTime);
    let dist = this.offsetY + (speed / 0.005) * (distance < 0 ? -1 : 1);
    const { min, max } = this.getRange(3, 2);
    dist = limitNumberInRange(dist, min, max);
    if (dist === 0) {
      this.stopInertiaMove = false;
      this.endScroll();
      return;
    }
    this.scrollDist(this.offsetY, dist, this.inertiaDuration);
  }

  /**
   * @description 更新惯性参数
   * @param event
   * @param isStart
   */
  updateInertiaParams(event: TouchEvent, isStart: boolean): void {
    const point = event.changedTouches[0];
    if (isStart) {
      this.lastMoveStart = point.pageY;
      this.lastMoveTime = event.timeStamp || Date.now();
    }
    this.stopInertiaMove = true;
  }

  /**
   * @description 根据计算的物理惯性距离滚动
   * @param startOffsetY
   * @param dist
   * @param duration
   */
  scrollDist(startOffsetY: number, dist: number, duration: number): void {
    this.stopInertiaMove = false;
    let start: any = null;
    const inertiaMove = (timestamp: number) => {
      if (this.stopInertiaMove) {
        return;
      }
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newOffsetY = quartEaseOut(progress, startOffsetY, dist - startOffsetY, duration);
      this.setOffsetY(newOffsetY);
      if (progress > duration || newOffsetY > this.offsetYOfStartBound || newOffsetY < this.offsetYOfEndBound) {
        this.endScroll();
      } else {
        window.requestAnimationFrame(inertiaMove);
      }
    };
    window.requestAnimationFrame(inertiaMove);
  }

  /**
   * @description 更新picker，一般当数据变化需要ui更新的时候调用
   */
  update(options?: any): void {
    this.updateItems();
    const targetIndex = this.elementItems.findIndex((el: HTMLLIElement) => el.textContent === this.curValue);
    const updateIndex = targetIndex === -1 ? 0 : targetIndex;
    this.updateIndex(updateIndex, options);
  }

  /**
   * @description 更新picker索引，数据变化时调用
   * @param index
   * @param duration
   */
  updateIndex(index: number, options?: any): void {
    const realOptions = {
      duration: this.transitionDuration,
      isChange: true,
      ...options,
    };
    this.curIndex = index;
    this.setSelectedClassName();
    const moveOffsetY = this.indicatorOffset - index * this.itemHeight;
    if (this.list) {
      this.list.style.transform = `translate(0,${moveOffsetY}px) translateZ(0)`;
      this.list.style.transitionDuration = `${realOptions.duration}ms`;
      this.list.style.transitionTimingFunction = 'ease-out';
    }

    this.offsetY = moveOffsetY;
    this.offsetYOfStart = moveOffsetY;
    realOptions.isChange && this.onChange(index);
  }

  /**
   * @description 更新数据源
   */
  updateOptions(options: PickerColumn = []): void {
    this.pickerColumns = options;
  }

  /**
   * @description 获取当前索引
   */
  getCurIndex(): number {
    return this.curIndex;
  }

  /**
   * @description 设置item样式
   */
  setSelectedClassName(): void {
    const regClass = new RegExp(this.itemClassName, 'i');
    const regSelected = new RegExp(this.itemSelectedClassName, 'i');
    this.elementItems.forEach((item, i) => {
      const tempItem = item;
      const itemClass = tempItem.className;
      if (itemClass === '' || !itemClass) {
        tempItem.className = this.itemClassName;
      } else {
        if (!regClass.test(itemClass)) {
          tempItem.classList.add(this.itemClassName);
        }
        if (regSelected.test(itemClass)) {
          tempItem.classList.remove(this.itemSelectedClassName);
        }
      }
      if (this.curIndex === i) {
        tempItem.classList.add(this.itemSelectedClassName);
      }
    });
  }

  /**
   * 设置当前picker的滚动位移
   * @param offsetY
   */
  setOffsetY(offsetY: number): void {
    this.offsetY = offsetY;
    if (this.list) {
      this.list.style.transform = `translate3d(0, ${offsetY}px, 0)`;
    }
  }

  /**
   * @description 结束滚动时的回调
   */
  endScroll(): void {
    if (this.stopInertiaMove) return;

    // 设置回弹动画
    if (this.list) {
      this.list.style.transition = `${this.bounceDuration}ms ease-out`;
    }

    let curIndex = 0;
    if (this.offsetY > this.offsetYOfStartBound) {
      curIndex = 0;
    } else if (this.offsetY < this.offsetYOfEndBound) {
      curIndex = this.elementItems.length - 1;
    } else {
      curIndex = -Math.round((this.offsetY - this.indicatorOffset) / this.itemHeight);
      curIndex = Math.max(0, Math.min(curIndex, this.elementItems.length - 1));
    }

    curIndex = findIndexOfEnabledOption(this.pickerColumns, curIndex, this.options.keys);

    const offsetY = this.indicatorOffset - curIndex * this.itemHeight;
    this.setOffsetY(offsetY);

    if (curIndex !== this.curIndex) {
      this.curIndex = curIndex;
      this.setSelectedClassName();
      this.onChange(this.curIndex);
    }
  }

  destroy(): void {
    // 清理 ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    // @ts-ignore: TODO
    delete this.holder;
  }
}

export default Picker;
