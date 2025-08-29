import type { Directive, DirectiveBinding } from 'vue';

/*
 * v-hover 指令：在触摸/指针按下短暂延迟后添加 class，结束后保持一段时间再移除。
 * 支持：
 *  1. 绑定值可以是字符串 (作为 className) 或对象 { className, disabledHover, startTime, stayTime }
 *  2. 响应式更新（className / disabledHover 改变）
 *  3. 自动清理（unmounted）
 *  4. 使用 pointer 事件回退到 touch 事件，避免重复触发
 */

export interface HoverBindingObject {
  className: string; // 必填：需要添加/移除的类名
  disabledHover?: boolean; // 是否禁用
  startTime?: number; // 按下到添加类的延迟(ms)
  stayTime?: number; // 松开到移除类的延迟(ms)
}

type HoverBinding = string | HoverBindingObject | undefined;

interface HoverContext {
  add: () => void;
  remove: () => void;
  downHandler: (e: Event) => void;
  upHandler: (e: Event) => void;
  cancelHandler: (e: Event) => void;
  timers: number[];
  current: Required<Pick<HoverBindingObject, 'className' | 'disabledHover' | 'startTime' | 'stayTime'>>;
}

const DEFAULT_DELAY = { startTime: 50, stayTime: 70 };
const CTX_KEY: unique symbol = Symbol('v-hover');

function resolveBinding(binding: DirectiveBinding<HoverBinding>): HoverContext['current'] {
  if (!binding.value) {
    return { className: '', disabledHover: true, startTime: DEFAULT_DELAY.startTime, stayTime: DEFAULT_DELAY.stayTime };
  }
  if (typeof binding.value === 'string') {
    return {
      className: binding.value,
      disabledHover: false,
      startTime: DEFAULT_DELAY.startTime,
      stayTime: DEFAULT_DELAY.stayTime,
    };
  }
  const {
    className,
    disabledHover = false,
    startTime = DEFAULT_DELAY.startTime,
    stayTime = DEFAULT_DELAY.stayTime,
  } = binding.value;
  return { className, disabledHover, startTime, stayTime };
}

const Hover: Directive<HTMLElement, HoverBinding> = {
  created(el, binding) {
    const state = resolveBinding(binding);
    const ctx: HoverContext = {
      current: state,
      timers: [],
      add() {
        if (ctx.current.disabledHover || !ctx.current.className) return;
        // 避免重复添加
        if (!el.classList.contains(ctx.current.className)) {
          el.classList.add(ctx.current.className);
        }
      },
      remove() {
        if (ctx.current.className) el.classList.remove(ctx.current.className);
      },
      downHandler() {
        if (ctx.current.disabledHover) return;
        // 按下后预定时添加
        ctx.timers.push(
          window.setTimeout(() => {
            ctx.add();
          }, ctx.current.startTime),
        );
      },
      upHandler() {
        if (ctx.current.disabledHover) return;
        ctx.timers.push(
          window.setTimeout(() => {
            ctx.remove();
          }, ctx.current.stayTime),
        );
      },
      cancelHandler() {
        // 取消（如滚动、移出）立即移除
        ctx.remove();
      },
    };

    // 保存上下文
    // @ts-ignore - 自定义 symbol 属性
    el[CTX_KEY] = ctx;

    // pointer 事件优先，兼容性不足时使用 touch
    const hasPointer = 'PointerEvent' in window;
    if (hasPointer) {
      el.addEventListener('pointerdown', ctx.downHandler, { passive: true });
      el.addEventListener('pointerup', ctx.upHandler, { passive: true });
      el.addEventListener('pointercancel', ctx.cancelHandler, { passive: true });
      el.addEventListener('pointerleave', ctx.cancelHandler, { passive: true });
    } else {
      el.addEventListener('touchstart', ctx.downHandler, { passive: true });
      el.addEventListener('touchend', ctx.upHandler, { passive: true });
      el.addEventListener('touchcancel', ctx.cancelHandler, { passive: true });
      el.addEventListener('touchmove', ctx.cancelHandler, { passive: true });
    }
  },
  updated(el, binding) {
    // @ts-ignore
    const ctx: HoverContext | undefined = el[CTX_KEY];
    if (!ctx) return;
    const next = resolveBinding(binding);
    const prev = ctx.current;
    // className 变化需要替换
    if (prev.className !== next.className) {
      if (prev.className) el.classList.remove(prev.className);
      if (!next.disabledHover && next.className && el.matches(':active')) {
        el.classList.add(next.className);
      }
    }
    ctx.current = next;
  },
  unmounted(el) {
    // @ts-ignore
    const ctx: HoverContext | undefined = el[CTX_KEY];
    if (!ctx) return;
    ctx.timers.forEach((t) => window.clearTimeout(t));
    ctx.remove();
    const hasPointer = 'PointerEvent' in window;
    if (hasPointer) {
      el.removeEventListener('pointerdown', ctx.downHandler);
      el.removeEventListener('pointerup', ctx.upHandler);
      el.removeEventListener('pointercancel', ctx.cancelHandler);
      el.removeEventListener('pointerleave', ctx.cancelHandler);
    } else {
      el.removeEventListener('touchstart', ctx.downHandler);
      el.removeEventListener('touchend', ctx.upHandler);
      el.removeEventListener('touchcancel', ctx.cancelHandler);
      el.removeEventListener('touchmove', ctx.cancelHandler);
    }
    // @ts-ignore
    delete el[CTX_KEY];
  },
};

export default Hover;
