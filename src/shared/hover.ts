import { DirectiveBinding, VNode } from 'vue';

interface BindingObj {
  disabledName: string;
  className: string;
}

const Hover = {
  created(el: HTMLElement, binding: DirectiveBinding<BindingObj>, vnode: VNode) {
    const startTime = 50;
    const stayTime = 70;
    const { className, disabledName = 'disabled' } = binding.value;

    el.addEventListener(
      'touchstart',
      () => {
        // @ts-ignore
        if (vnode.ctx.ctx[disabledName]) return;

        setTimeout(() => {
          el?.classList.add(className);
        }, startTime);
      },
      { capture: false, passive: true },
    );

    el.addEventListener(
      'touchend',
      () => {
        // @ts-ignore
        if (vnode.ctx.ctx[disabledName]) return;

        setTimeout(() => {
          el?.classList.remove(className);
        }, stayTime);
      },
      false,
    );
  },
};

export default Hover;
