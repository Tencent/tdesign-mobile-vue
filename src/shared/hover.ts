import { DirectiveBinding } from 'vue';

interface BindingObj {
  active: boolean;
  className: string;
}

const Hover = {
  created(el: HTMLElement, binding: DirectiveBinding<BindingObj>) {
    const startTime = 50;
    const stayTime = 70;
    const { className, active } = binding.value;

    if (!active) return;

    el.addEventListener(
      'touchstart',
      () => {
        setTimeout(() => {
          el?.classList.add(className);
        }, startTime);
      },
      false,
    );

    el.addEventListener(
      'touchend',
      () => {
        setTimeout(() => {
          el?.classList.remove(className);
        }, stayTime);
      },
      false,
    );
  },
};

export default Hover;
