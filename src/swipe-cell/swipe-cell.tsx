import {
  ref,
  watch,
  reactive,
  computed,
  onMounted,
  defineComponent,
  getCurrentInstance,
  StyleValue,
  onUnmounted,
} from 'vue';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import { useSwipe } from './useSwipe';
import props from './props';
import config from '../config';
import { SwipeActionItem, SwipeSource } from './type';
import { useClickAway } from '../shared';
import { preventDefault } from '../shared/dom';
import { useSureConfirm } from './useSureConfirm';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export interface SwipeInitData {
  moving: boolean;
  moved: boolean;
  leftWidth: number;
  rightWidth: number;
  offset: number;
  pos: number;
  status: 'open' | 'close';
}

export default defineComponent({
  name: `${prefix}-swipe-cell`,
  props,
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();
    const swipeCellClass = usePrefixClass('swipe-cell');

    const internalInstance = getCurrentInstance();

    const leftRef = ref<HTMLElement>();
    const rightRef = ref<HTMLElement>();
    const swipeCellRef = ref<HTMLElement>();
    const wrapperStyle = computed(() => {
      const transform = `translate3d(${initData.pos}px, 0, 0)`;
      let transition = 'margin-left .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      transition += ',margin-right .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      transition += initData.moving ? '' : ',transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      return {
        position: 'relative',
        transition,
        transform,
        marginLeft: `${sureMarginLeft.value}px`,
        marginRight: `${sureMarginRight.value}px`,
      } as StyleValue;
    });

    const distance = 10; // distance 滑动多少距离后开始显示菜
    const autoBack = true; // autoBack 点击菜单后是否收回菜
    const threshold = 0.3; // threshold 滑动宽度的百分之多少自动打开菜单，否则收回
    const initData: SwipeInitData = reactive({
      moving: false, // 是否正在划动
      moved: false, // 标记是否有过划动，划动过则不触发点击事件
      leftWidth: 0, // 左边菜单的宽度
      rightWidth: 0, // 右边菜单的宽度
      offset: 0, // 起点时的偏移
      pos: 0, // 移动的距离
      status: 'close', // 菜单的状态，默认close
    });

    const {
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
    } = useSureConfirm(internalInstance, initData);

    const range = (num: number, min: number, max: number) => {
      return Math.min(Math.max(num, min), max);
    };
    // 首次touchmove的方向，用于分开左右和上下滑动，左右滑动时禁止上下滑动，上下滑动时禁止左右滑动
    let swipeDir: -1 | 0 | 1 = 0;
    const { lengthX, lengthY, stop } = useSwipe(swipeCellRef, {
      threshold: 0,
      onSwipeStart: (e: TouchEvent) => {
        if (props.disabled) {
          return;
        }
        setPanelWidth();
        swipeDir = 0;
        initData.moved = false;
        initData.offset = initData.pos;
      },
      onSwipe: (e: TouchEvent) => {
        const absLenX = Math.abs(lengthX.value);
        const absLenY = Math.abs(lengthY.value);
        // distance / 2 是为了避免触发上下滑动时 又走左右滑动的逻辑 导致preventDefault终止无效
        if (!swipeDir && absLenX < distance / 2 && absLenY < distance / 2) {
          return;
        }
        if (!swipeDir && absLenX < absLenY) {
          swipeDir = -1;
        } else if (!swipeDir && absLenX >= absLenY) {
          swipeDir = 1;
        }
        if (swipeDir < 0) {
          swipeDir = -1;
          return;
        }
        preventDefault(e, false);

        if (props.disabled || (!initData.moved && Math.abs(lengthX.value) < distance)) {
          return;
        }

        if (showSureRight.value) {
          closedSure.value = lengthX.value > 0 && initData.pos === 0;
          showSureRight.value = false;
        } else if (showSureLeft.value) {
          closedSure.value = lengthX.value < 0 && initData.pos === 0;
          showSureLeft.value = false;
        }
        initData.moving = true;
        initData.moved = true;
        const offset = range(initData.offset - lengthX.value, -initData.rightWidth, initData.leftWidth);
        initData.pos = offset;
      },
      onSwipeEnd: (e: TouchEvent) => {
        if (props.disabled) {
          return;
        }
        initData.moving = false;
        setTimeout(() => {
          closedSure.value = false;
        }, 0);
        end();
      },
    });

    const setPanelWidth = () => {
      const leftWidth = leftRef.value?.clientWidth as number;
      const rightWidth = rightRef.value?.clientWidth as number;
      initData.leftWidth = leftWidth > 0 ? leftWidth : 0;
      initData.rightWidth = rightWidth > 0 ? rightWidth : 0;
    };

    const classes = computed(() => [`${name}`]);
    onMounted(async () => {
      setPanelWidth();
      renderMenuStatus();
    });
    onUnmounted(() => {
      stop();
      stopClickAway.value?.();
    });
    watch(
      () => props.opened,
      () => renderMenuStatus(),
      { deep: true },
    );
    watch(
      () => initData.pos,
      (newVal, oldVal) => {
        if (rightRef.value && (newVal < 0 || (newVal === 0 && oldVal < 0))) {
          updateRightMenuPosStyle(newVal);
        } else if (leftRef.value && (newVal > 0 || (newVal === 0 && oldVal > 0))) {
          updateLeftMenuPosStyle(newVal);
        }
      },
    );
    const updateRightMenuPosStyle = (value?: number) => {
      if (!rightRef.value) return;
      const pos = value || initData.pos;
      const children: any = rightRef.value.children || [];
      const wArr: number[] = [];
      for (let i = 0, len = children.length - 2; i < len; ++i) {
        const el = children[i] as HTMLElement;
        wArr.push((wArr[i - 1] || 0) + el.clientWidth);
      }
      for (let i = 0, len = children.length - 2; i < len; ++i) {
        const el = children[i] as HTMLElement;
        const w = (1 + pos / initData.rightWidth) * (wArr[i - 1] || 0);
        if (el) {
          el.style.transform = `translate3d(${-w}px, 0, 0)`;
          el.style.transition = initData.moving ? 'none' : `transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)`;
        }
      }
    };
    const updateLeftMenuPosStyle = (value?: number) => {
      if (!leftRef.value) return;
      const pos = value || initData.pos;
      const { children } = leftRef.value;
      const wArr: number[] = [];
      for (let i = 0, len = children.length - 2; i < len; ++i) {
        const el = children[i] as HTMLElement;
        wArr.push((wArr[i - 1] || 0) + el.clientWidth);
      }
      for (let i = 0, len = children.length - 2; i < len; ++i) {
        const el = children[i] as HTMLElement;
        const w = (1 - pos / initData.leftWidth) * (wArr[i - 1] || 0);
        if (el) {
          el.style.transform = `translate3d(${w}px, 0, 0)`;
          el.style.transition = initData.moving ? 'none' : `transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)`;
        }
      }
    };
    const stopClickAway = ref(
      useClickAway(
        swipeCellRef,
        () => {
          close();
        },
        { detectIframe: true },
      ),
    );
    const renderMenuStatus = () => {
      if (isBoolean(props.opened)) {
        // opened为boolean类型，判断默认打开
        if (props.opened && initData.rightWidth > 0) {
          open('toLeft');
        } else if (props.opened && initData.leftWidth > 0) {
          open('toRight');
        } else if (!props.opened && (initData.leftWidth > 0 || initData.rightWidth > 0)) {
          close();
        }
      } else if (isArray(props.opened)) {
        // opened为array类型，判断默认打开，同时设定左右action时优先打开右边
        if (props.opened[1] && initData.rightWidth > 0) {
          open('toLeft');
        } else if (props.opened[0] && initData.leftWidth > 0) {
          open('toRight');
        } else if ((!props.opened[1] && initData.rightWidth > 0) || (!props.opened[0] && initData.leftWidth > 0)) {
          close();
        }
      }
    };
    const end = () => {
      if (props.disabled) {
        return;
      }
      if (
        +initData.rightWidth > 0 &&
        ((-initData.offset < +initData.rightWidth && -initData.pos > +initData.rightWidth * threshold) ||
          // 处理回弹
          (-initData.offset === +initData.rightWidth && -initData.pos > +initData.rightWidth * (1 - threshold)))
      ) {
        open('toLeft');
      } else if (
        +initData.leftWidth > 0 &&
        ((initData.offset < +initData.leftWidth && initData.pos > +initData.leftWidth * threshold) ||
          // 处理回弹
          (initData.offset === +initData.leftWidth && initData.pos > +initData.leftWidth * (1 - threshold)))
      ) {
        open('toRight');
      } else if (initData.offset !== initData.pos) {
        // 仅在有发生侧滑的情况下自动关闭（由js控制是否异步关闭）
        close('force');
      }
    };
    const open = (direction: 'toRight' | 'toLeft') => {
      // 包括回弹open
      const isOpen = initData.status === 'open';

      initData.status = 'open';
      if (direction === 'toLeft') {
        initData.pos = -initData.rightWidth;
        if (initData.rightWidth && !isOpen) {
          props.onChange?.('right');
        }
      } else {
        initData.pos = initData.leftWidth;
        if (initData.leftWidth && !isOpen) {
          props.onChange?.('left');
        }
      }
    };
    const close = (type?: string) => {
      if (initData.status === 'close' && type !== 'force') {
        return;
      }
      sureMarginLeft.value = 0;
      sureMarginRight.value = 0;
      initData.status = 'close';
      initData.pos = 0;
      props.onChange?.(undefined);
    };
    const handleClickBtn = ({ action, source }: { action: SwipeActionItem; source: SwipeSource }) => {
      const clickFn = () => {
        if (autoBack) {
          close();
        }
        if (action?.onClick) {
          action.onClick();
          return;
        }
        props.onClick?.(action, source);
      };
      if (action?.sure) {
        showSure(action.sure, clickFn);
        return;
      }
      clickFn();
    };
    // 点击事件拦截，判定是否透传事件
    const handleCellClick = (e: Event) => {
      if (initData.moved) {
        preventDefault(e, true);
      }
      e.stopPropagation();
    };

    context.expose({
      showSure,
    });
    const renderLeft = () => {
      const leftContent = () => {
        if (Array.isArray(props.left)) {
          return props.left.map((btn) => {
            const btnClass = [`${swipeCellClass.value}__content`, btn.className || ''];
            const style = btn.style || 'height: 100%';
            const { icon: btnIcon } = btn;
            const { text: btnText } = btn;
            return (
              <div
                class={btnClass}
                style={style}
                onClick={(e: MouseEvent) => handleClickBtn({ action: btn, source: 'left' })}
              >
                {btnIcon ? <btnIcon class={`${swipeCellClass.value}__icon`} /> : null}
                {btnText ? <span class={`${swipeCellClass.value}__text`}>{btnText}</span> : null}
              </div>
            );
          });
        }
        return renderTNodeJSX('left');
      };

      return (
        <div
          ref={leftRef}
          class={`${swipeCellClass.value}__left`}
          style={{
            width: initData?.leftWidth ? `${initData.leftWidth}px` : 'auto',
          }}
        >
          {leftContent()}
          <div style={sureLeftBgStyle.value}></div>
          <div ref={sureLeftRef} style={sureLeftStyle.value} onClick={(e: MouseEvent) => handleSureClick}>
            {sureLeftContent.value}
          </div>
        </div>
      );
    };
    const renderRight = () => {
      const rightContent = () => {
        if (Array.isArray(props.right)) {
          return props.right.map((btn) => {
            const btnClass = [`${swipeCellClass.value}__content`, btn.className || ''];
            const style = btn.style || 'height: 100%';
            const { icon: btnIcon } = btn;
            const { text: btnText } = btn;
            return (
              <div class={btnClass} style={style} onClick={() => handleClickBtn({ action: btn, source: 'right' })}>
                {btnIcon && <btnIcon class={`${swipeCellClass.value}__icon`}></btnIcon>}
                {btnText && <span class={`${swipeCellClass.value}__text`}>{btnText}</span>}
              </div>
            );
          });
        }
        return renderTNodeJSX('right');
      };

      return (
        <div
          ref={rightRef}
          class={`${swipeCellClass.value}__right`}
          style={{
            width: initData.rightWidth ? `${initData.rightWidth}px` : 'auto',
          }}
        >
          {rightContent()}
          <div style={sureRightBgStyle.value}></div>
          <div ref={sureRightRef} style={sureRightStyle.value} onClick={(e: MouseEvent) => handleSureClick}>
            {sureRightContent.value}
          </div>
        </div>
      );
    };
    return () => {
      return (
        <div ref={swipeCellRef} class={swipeCellClass.value} onClick={handleCellClick}>
          <div class={`${swipeCellClass.value}__wrapper`} style={wrapperStyle.value}>
            {renderLeft()}
            {renderTNodeContent('default', 'content')}
            {renderRight()}
          </div>
        </div>
      );
    };
  },
});
