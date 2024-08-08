import { DirectiveBinding } from 'vue';

interface BindingObj {
  disabledHover: boolean;
  className: string;
}

const Hover = {
  created(el: HTMLElement, binding: DirectiveBinding<BindingObj>) {
    const startTime = 50;
    const stayTime = 70;
    const { className, disabledHover = false } = binding.value;

    el.addEventListener(
      'touchstart',
      () => {
        if (disabledHover) return;

        setTimeout(() => {
          el?.classList.add(className);
        }, startTime);
      },
      { capture: false, passive: true },
    );

    el.addEventListener(
      'touchend',
      () => {
        if (disabledHover) return;

        setTimeout(() => {
          el?.classList.remove(className);
        }, stayTime);
      },
      false,
    );
  },
};

export default Hover;
