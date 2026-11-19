import { ref, computed, type Ref } from 'vue';
import type { SwipeActionItem, SwipeSource } from './type';

const DEFAULT_SETTLE_DURATION = 600;
const DEFAULT_THRESHOLD = 0.9;

export interface FullSwipeClassNames {
  sliding: string;
  pinStart: string;
  pinEnd: string;
}

/** hook 依赖的最小滑动状态契约（字段可多不可少） */
export interface FullSwipeState {
  moving: boolean;
  leftWidth: number;
  rightWidth: number;
  /** 当前位移，右滑为正、左滑为负 */
  pos: number;
  status: 'open' | 'close';
}

export interface UseFullSwipeOptions<Action = SwipeActionItem> {
  enabled: () => boolean;
  /** 滑动状态源，hook 会读写 pos/status 以驱动回弹与触发 */
  state: FullSwipeState;
  panels: Record<SwipeSource, Ref<HTMLElement | undefined>>;
  /** 整行宽度，用于最大位移与触发阈值 */
  getCellWidth: () => number;
  /** 松手触发目标操作；有数据项时回传 action，否则回传 actionEl */
  onTrigger: (payload: { action?: Action; actionEl?: HTMLElement; side: SwipeSource }) => void;

  /** 该侧操作项数据数组；返回 undefined 表示纯 DOM/插槽写法（只回传 actionEl） */
  getSideActions?: (side: SwipeSource) => Action[] | undefined;
  /** 自定义标记类名；未提供时由 prefix 生成默认命名 */
  classNames?: () => FullSwipeClassNames;
  prefix?: Ref<string>;
  /** 面板末尾不参与操作项计数的保留节点数（如二次确认节点），默认 0 */
  reservedTrailingCount?: number;
  /** 触发阈值（整行宽度比例），默认 0.9 */
  threshold?: number;
  /** 回弹动画时长（ms），默认 600，需与样式过渡时长一致 */
  settleDuration?: number;
}

/**
 * 「滑动到底自动执行」(full-swipe) 通用交互 hook。
 * 组件专有假设均通过 options 注入，可被任意 Vue 侧滑组件复用。
 */
export function useFullSwipe<Action = SwipeActionItem>(options: UseFullSwipeOptions<Action>) {
  const { enabled, state, panels, getCellWidth, onTrigger } = options;
  const threshold = options.threshold ?? DEFAULT_THRESHOLD;
  const settleDuration = options.settleDuration ?? DEFAULT_SETTLE_DURATION;
  const reservedTrailingCount = options.reservedTrailingCount ?? 0;

  // 回弹期间冻结拉伸宽度，只让外层位移做动画
  const settling = ref(false);
  const holdSide = ref<SwipeSource | undefined>();
  const holdWidth = ref(0);
  let settleTimer: ReturnType<typeof setTimeout> | undefined;

  const classNames = computed<FullSwipeClassNames>(() => {
    if (options.classNames) return options.classNames();
    const sliding = `${options.prefix?.value ?? ''}__action-sliding`;
    return { sliding, pinStart: `${sliding}--pin-start`, pinEnd: `${sliding}--pin-end` };
  });

  const getMenuWidth = (side: SwipeSource) => (side === 'right' ? state.rightWidth : state.leftWidth);
  /** 该侧越过菜单宽度的位移（恒为正） */
  const getDisplacement = (side: SwipeSource, pos: number) => (side === 'right' ? -pos : pos);
  const getActionCount = (panel: HTMLElement) => panel.children.length - reservedTrailingCount;

  const getAction = (side: SwipeSource): Action | undefined => {
    const actions = options.getSideActions?.(side);
    if (!Array.isArray(actions) || !actions.length) return undefined;
    return actions[actions.length - 1];
  };
  /** 该侧目标操作项（最外侧）的 DOM 元素 */
  const getActionEl = (side: SwipeSource): HTMLElement | undefined => {
    const panel = panels[side].value;
    if (!panel) return undefined;
    const count = getActionCount(panel);
    if (count <= 0) return undefined;
    return panel.children[count - 1] as HTMLElement;
  };
  const canFullSwipe = (side: SwipeSource) => !!enabled() && getMenuWidth(side) > 0 && !!getActionEl(side);

  /** 当前处于拉伸态的一侧；回弹期间保持冻结值 */
  const side = computed<SwipeSource | undefined>(() => {
    if (state.moving) {
      if (canFullSwipe('right') && state.pos < -state.rightWidth) return 'right';
      if (canFullSwipe('left') && state.pos > state.leftWidth) return 'left';
      return undefined;
    }
    if (settling.value) return holdSide.value;
    return undefined;
  });

  /** full-swipe 下该侧面板宽度；非拉伸态返回 undefined（用自然宽度） */
  const getPanelWidth = (target: SwipeSource): number | undefined => {
    if (side.value !== target) return undefined;
    if (!state.moving && settling.value) return holdWidth.value;
    return Math.max(getMenuWidth(target), getDisplacement(target, state.pos));
  };

  const clearItem = (el: HTMLElement) => {
    const { sliding, pinStart, pinEnd } = classNames.value;
    el.classList.remove(sliding, pinStart, pinEnd);
  };

  /**
   * 目标项用 flex:1 占满面板剩余空间，其余项保持自然宽度。
   * @returns 是否命中 full-swipe（命中后无需再走常规位移逻辑）
   */
  const applyStyle = (target: SwipeSource, pos: number): boolean => {
    const panel = panels[target].value;
    if (!panel) return false;
    const displacement = getDisplacement(target, pos);
    if (!(enabled() && canFullSwipe(target) && displacement > getMenuWidth(target))) return false;
    const { children } = panel;
    const count = getActionCount(panel);
    if (count <= 0) return false;
    const { sliding, pinStart, pinEnd } = classNames.value;
    const pin = target === 'right' ? pinStart : pinEnd;
    for (let i = 0; i < count; ++i) {
      const el = children[i] as HTMLElement;
      if (!el) continue;
      el.classList.add(sliding);
      if (i === count - 1) {
        el.classList.add(pin);
      } else {
        el.classList.remove(pinStart, pinEnd);
      }
    }
    return true;
  };

  /** 松手按阈值判定是否自动执行目标操作；执行前先回到展开态作为回弹基准 */
  const trigger = (): boolean => {
    const cellWidth = getCellWidth();
    if (!enabled() || !cellWidth) return false;
    let target: SwipeSource | undefined;
    if (state.pos < 0) target = 'right';
    else if (state.pos > 0) target = 'left';
    if (!target || !canFullSwipe(target)) return false;
    const displacement = getDisplacement(target, state.pos);
    if (displacement <= Math.max(getMenuWidth(target), cellWidth * threshold)) return false;
    state.status = 'open';
    state.pos = target === 'right' ? -state.rightWidth : state.leftWidth;
    onTrigger({ action: getAction(target), actionEl: getActionEl(target), side: target });
    return true;
  };

  /** 松手进入回弹：冻结拉伸宽度，动画结束后复位 */
  const startSettle = (wasSide: SwipeSource | undefined, resetFn: () => void) => {
    if (!wasSide) return;
    holdSide.value = wasSide;
    holdWidth.value = getDisplacement(wasSide, state.pos);
    settling.value = true;
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      settling.value = false;
      settleTimer = undefined;
      if (!state.moving) resetFn();
    }, settleDuration);
  };

  const dispose = () => {
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = undefined;
  };

  return {
    side,
    settling,
    canFullSwipe,
    getActionEl,
    getPanelWidth,
    applyStyle,
    clearItem,
    trigger,
    startSettle,
    dispose,
  };
}
