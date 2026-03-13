import { ref, inject, computed, getCurrentInstance, onMounted, onUnmounted, watch, defineComponent } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

import config from '../config';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-swiper-item`,
  setup() {
    const { addChild, removeChild, isVertical, root, items, setContainerHeight, moveDirection } = inject(
      'parent',
    ) as any;
    const swiperItemClass = usePrefixClass('swiper-item');
    const readerTNodeJSX = useTNodeJSX();
    const selfRef = ref(null);
    const rootStyle = ref('');
    const instance = getCurrentInstance();

    const direction = computed(() => (isVertical.value ? 'Y' : 'X'));

    const calcTranslateStyle = (index: number, activeIndex: number) => {
      const distance = root.value?.[isVertical.value ? 'offsetHeight' : 'offsetWidth'] ?? 0;
      const lastItemIndex = items.value.length - 1;
      let step = index - activeIndex;
      // lastItem: 当处于最后一项时，将第一项放到右侧
      if (activeIndex === lastItemIndex && index === 0) {
        step = 1;
      }
      // firstItem: 当处于第一项时，将最后一项放到左侧
      if (activeIndex === 0 && index === lastItemIndex && index !== 1) {
        step = -1;
      }

      // 当只有 2 个 item 时，根据滑动方向决定另一个 item 放在哪一侧
      if (items.value.length === 2 && activeIndex !== index) {
        step = moveDirection.value === -1 ? -1 : 1;
      }

      if (activeIndex === index) step = 0;

      rootStyle.value = `transform: translate${direction.value}(${step * distance}px)`;
    };
    const { height } = useElementBounding(selfRef);

    watch(height, (val) => {
      setContainerHeight(val);
    });

    onMounted(() => {
      addChild({
        proxy: instance?.proxy,
        uid: instance?.uid,
        calcTranslateStyle,
      });
    });

    onUnmounted(() => {
      removeChild(instance?.uid);
    });

    return () => (
      <div ref={selfRef} class={swiperItemClass.value} style={rootStyle.value}>
        {readerTNodeJSX('default')}
      </div>
    );
  },
});
