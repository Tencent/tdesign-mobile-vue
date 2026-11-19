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
import { isArray, isBoolean } from 'lodash-es';
import { useSwipe } from './useSwipe';
import { useFullSwipe } from './useFullSwipe';
import props from './props';
import { SwipeActionItem, SwipeSource } from './type';
import { useClickAway } from '../shared';
import { preventDefault } from '../shared/dom';
import { useSureConfirm } from './useSureConfirm';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

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
  name: 'TSwipeCell',
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

    // 组件宽度，用于滑动到底时的最大位移和触发阈值
    let cellWidth = 0;
    // 「滑动到底自动执行」
    const fullSwipe = useFullSwipe({
      enabled: () => !!props.fullSwipe,
      state: initData,
      panels: { left: leftRef, right: rightRef },
      prefix: swipeCellClass,
      // 面板末尾两个固定为二次确认节点，不参与操作项计数
      reservedTrailingCount: 2,
      // 数组写法回传操作项数据，插槽写法回传 undefined（仅回传 actionEl）
      getSideActions: (side) => {
        const actions = props[side];
        return isArray(actions) ? (actions as SwipeActionItem[]) : undefined;
      },
      getCellWidth: () => cellWidth,
      onTrigger: ({ action, actionEl, side }) => {
        if (action) {
          // 数组写法：等同于点击该操作项（含二次确认、autoBack 等逻辑）
          handleClickBtn({ action, source: side });
        } else {
          // 插槽写法：触发最后一个操作元素的点击事件，并自动收起
          actionEl?.click();
          if (autoBack) close();
        }
      },
    });

    const rightPanelWidth = computed(() => fullSwipe.getPanelWidth('right') ?? initData.rightWidth);
    const leftPanelWidth = computed(() => fullSwipe.getPanelWidth('left') ?? initData.leftWidth);
    // 操作区宽度由位移直接驱动，不做独立动画
    const panelTransition = computed(() => (props.fullSwipe ? 'none' : undefined));

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
    let dragging = false;
    const { lengthX, lengthY, stop } = useSwipe(swipeCellRef, {
      threshold: 0,
      onSwipeStart: (e: TouchEvent) => {
        dragging = false;
        if (props.disabled) {
          return;
        }
        setPanelWidth();
        cellWidth = swipeCellRef.value?.clientWidth || 0;
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
        if (!dragging) {
          props.onDragstart?.();
        }
        dragging = true;
        initData.moving = true;
        initData.moved = true;
        const maxRight = fullSwipe.canFullSwipe('right')
          ? Math.max(initData.rightWidth, cellWidth)
          : initData.rightWidth;
        const maxLeft = fullSwipe.canFullSwipe('left') ? Math.max(initData.leftWidth, cellWidth) : initData.leftWidth;
        const offset = range(initData.offset - lengthX.value, -maxRight, maxLeft);
        initData.pos = offset;
      },
      onSwipeEnd: (e: TouchEvent) => {
        const wasDragging = dragging;
        dragging = false;
        if (props.disabled) {
          return;
        }
        const wasFullSwiping = fullSwipe.side.value;
        initData.moving = false;
        fullSwipe.startSettle(wasFullSwiping, resetMenuPosStyle);
        setTimeout(() => {
          closedSure.value = false;
        }, 0);
        if (!fullSwipe.trigger()) {
          end();
        }
        if (wasDragging) {
          props.onDragend?.();
        }
      },
    });

    const setPanelWidth = () => {
      if (fullSwipe.settling.value) return;
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
      fullSwipe.dispose();
    });
    watch(
      () => props.opened,
      () => renderMenuStatus(),
      { deep: true },
    );
    watch(
      () => initData.pos,
      (newVal, oldVal) => {
        // 回弹期间冻结按钮补偿，避免它跳到终值而外层位移仍在缓动
        if (fullSwipe.settling.value && !initData.moving) return;
        if (rightRef.value && (newVal < 0 || (newVal === 0 && oldVal < 0))) {
          updateRightMenuPosStyle(newVal);
        } else if (leftRef.value && (newVal > 0 || (newVal === 0 && oldVal > 0))) {
          updateLeftMenuPosStyle(newVal);
        }
      },
      { flush: 'sync' },
    );
    const menuTransition = () =>
      initData.moving || fullSwipe.settling.value ? 'none' : `transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)`;
    // 常规侧滑：按位移比例对各操作项做层叠位移补偿；full-swipe 命中时交由 hook 以 class 驱动
    const updateMenuPosStyle = (side: SwipeSource, value?: number) => {
      const panel = side === 'right' ? rightRef.value : leftRef.value;
      if (!panel) return;
      const pos = value || initData.pos;
      if (fullSwipe.applyStyle(side, pos)) return;
      const { children } = panel;
      const count = children.length - 2;
      const menuWidth = side === 'right' ? initData.rightWidth : initData.leftWidth;
      const wArr: number[] = [];
      for (let i = 0; i < count; ++i) {
        wArr.push((wArr[i - 1] || 0) + (children[i] as HTMLElement).clientWidth);
      }
      const ratio = side === 'right' ? 1 + pos / menuWidth : 1 - pos / menuWidth;
      const sign = side === 'right' ? -1 : 1;
      for (let i = 0; i < count; ++i) {
        const el = children[i] as HTMLElement;
        if (!el) continue;
        fullSwipe.clearItem(el);
        const w = Math.max(0, ratio * (wArr[i - 1] || 0));
        el.style.transform = `translate3d(${sign * w}px, 0, 0)`;
        el.style.transition = menuTransition();
      }
    };
    const updateRightMenuPosStyle = (value?: number) => updateMenuPosStyle('right', value);
    const updateLeftMenuPosStyle = (value?: number) => updateMenuPosStyle('left', value);
    // 回弹动画结束后按终值复位按钮补偿，此时操作区已移出屏幕或宽度变化被裁剪
    const resetMenuPosStyle = () => {
      if (initData.pos < 0) {
        updateRightMenuPosStyle(initData.pos);
      } else if (initData.pos > 0) {
        updateLeftMenuPosStyle(initData.pos);
      } else {
        updateRightMenuPosStyle(0);
        updateLeftMenuPosStyle(0);
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
    // 滑动到底的触发逻辑已内聚到 useFullSwipe（见上方 fullSwipe.trigger）

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
          const actions = props.left;
          return actions.map((btn) => {
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
            width: leftPanelWidth.value ? `${leftPanelWidth.value}px` : 'auto',
            transition: panelTransition.value,
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
          const actions = props.right;
          return actions.map((btn) => {
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
            width: rightPanelWidth.value ? `${rightPanelWidth.value}px` : 'auto',
            transition: panelTransition.value,
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
