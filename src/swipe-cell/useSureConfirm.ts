import {
  ref,
  computed,
  CSSProperties,
  h,
  nextTick,
  watch,
  ComponentInternalInstance,
  setBlockTracking,
  Ref,
} from 'vue';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { SwipeInitData } from './swipe-cell.vue';
import { renderTNode } from '../shared';
import { SwipeActionItem } from './type';
import { TNode } from '../common';

// 二次确认
export function useSureConfirm(instance: ComponentInternalInstance | null, initData: SwipeInitData) {
  const sureRightRef = ref<HTMLElement>();
  const sureLeftRef = ref<HTMLElement>();
  const showSureRight = ref(false);
  const showSureLeft = ref(false);
  // 左右侧margin，用于补足二次确认内容和按钮集合的宽度不一致时，位移保持动态效果
  const sureMarginRight = ref(0);
  const sureMarginLeft = ref(0);
  // 关闭时是否动效
  const closedSure = ref(false);

  const sureRightContent = ref();
  const sureLeftContent = ref();

  const handleSureClick = ref<SwipeActionItem['onClick']>();

  const sureRightBgStyle = computed<CSSProperties>(() => {
    const style = {
      display: 'inline-block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0)',
      transition: closedSure.value ? 'none' : 'background-color .6s cubic-bezier(0.18, 0.89, 0.32, 1)',
      transform: `translate3d(${initData.rightWidth}px, 0, 0)`,
      pointerEvents: 'none',
    } as CSSProperties;

    if (showSureRight.value) {
      style.backgroundColor = 'rgba(0,0,0,.5)';
    } else {
      style.backgroundColor = 'rgba(0,0,0,0)';
    }
    return style;
  });

  const sureLeftBgStyle = computed<CSSProperties>(() => {
    const style = {
      display: 'inline-block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0)',
      transition: closedSure.value ? 'none' : 'background-color .6s cubic-bezier(0.18, 0.89, 0.32, 1)',
      transform: `translate3d(0, 0, 0)`,
      pointerEvents: 'none',
    } as CSSProperties;

    if (showSureLeft.value) {
      style.backgroundColor = 'rgba(0,0,0,.5)';
    } else {
      style.backgroundColor = 'rgba(0,0,0,0)';
    }
    return style;
  });

  const sureRightStyle = computed<CSSProperties>(() => {
    const style = {
      display: 'inline-block',
      position: 'absolute',
      height: '100%',
      top: 0,
      minWidth: '100%',
      transition: closedSure.value ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)',
      transform: `translate3d(0, 0, 0)`,
    } as CSSProperties;

    if (showSureRight.value) {
      style.transform = `translate3d(0, 0, 0)`;
    } else {
      style.transform = `translate3d(${initData.rightWidth}px, 0, 0)`;
    }
    return style;
  });

  const sureLeftStyle = computed<CSSProperties>(() => {
    const style = {
      display: 'inline-block',
      position: 'absolute',
      height: '100%',
      top: 0,
      minWidth: '100%',
      transition: closedSure.value ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)',
      transform: `translate3d(0, 0, 0)`,
    } as CSSProperties;

    if (showSureLeft.value) {
      style.transform = `translate3d(0, 0, 0)`;
    } else {
      style.transform = `translate3d(${-initData.leftWidth}px, 0, 0)`;
    }
    return style;
  });

  watch(showSureRight, () => {
    if (initData.pos < 0) {
      if (showSureRight.value) {
        const sureRightWidth = sureRightRef.value?.clientWidth as number;
        sureMarginRight.value = Math.max(initData.rightWidth, sureRightWidth) - initData.rightWidth;
      } else {
        sureMarginRight.value = 0;
      }
    }
  });
  watch(showSureLeft, () => {
    if (initData.pos > 0) {
      if (showSureLeft.value) {
        const sureLeftWidth = sureLeftRef.value?.clientWidth as number;
        sureMarginLeft.value = Math.max(initData.leftWidth, sureLeftWidth) - initData.leftWidth;
      } else {
        sureMarginLeft.value = 0;
      }
    }
  });

  const showSure = (sure: string | TNode, onClick?: SwipeActionItem['onClick']) => {
    handleSureClick.value = onClick;

    let sureContent: Ref<any> = sureRightContent;
    let sureVisible: Ref<boolean> = showSureRight;
    if (initData.pos > 0) {
      sureContent = sureLeftContent;
      sureVisible = showSureLeft;
    }

    if (isString(sure) && instance?.slots[sure]) {
      sureContent.value = renderTNode(instance, sure);
    } else if (isFunction(sure)) {
      setBlockTracking(-1);
      sureContent.value = sure(h);
      setBlockTracking(1);
    } else {
      sureContent.value = sure;
    }

    nextTick(() => {
      sureVisible.value = true;
    });
  };

  return {
    sureRightRef,
    sureLeftRef,
    showSureRight,
    showSureLeft,
    sureMarginRight,
    sureMarginLeft,
    closedSure,
    sureRightContent,
    sureLeftContent,
    sureLeftBgStyle,
    sureRightBgStyle,
    sureRightStyle,
    sureLeftStyle,
    showSure,
    handleSureClick,
  };
}
