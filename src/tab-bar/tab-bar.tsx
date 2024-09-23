import { defineComponent, ref, provide, Ref, computed, toRefs, onMounted } from 'vue';
import TabBarProps from './props';
import config from '../config';
import { useDefault, useChildSlots } from '../shared';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-bar`,
  props: TabBarProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context) {
    const tabBarClass = usePrefixClass('tab-bar');

    const renderTNodeJSX = useTNodeJSX();
    const [activeValue] = useDefault(props, context.emit, 'value', 'change');
    const defaultIndex: Ref<number> = ref(-1);
    const itemCount = ref(0);

    onMounted(() => {
      const nodes = context.slots.default && context.slots.default();
      if (nodes !== undefined) {
        const childSlots = useChildSlots(`${prefix}-tab-bar-item`);
        itemCount.value = childSlots.length;
      }
    });

    const updateChild = (currentValue: number | string) => {
      activeValue.value = currentValue;
    };

    const rootClass = computed(() => [
      `${tabBarClass.value}`,
      {
        [`${tabBarClass.value}--bordered`]: props.bordered,
        [`${tabBarClass.value}--fixed`]: props.fixed,
        [`${tabBarClass.value}--safe`]: props.safeAreaInsetBottom,
      },
      `${tabBarClass.value}--${props.shape}`,
    ]);

    provide('tab-bar', {
      ...toRefs(props),
      defaultIndex,
      activeValue,
      itemCount,
      updateChild,
    });

    return () => (
      <div class={rootClass.value} role="tablist">
        {renderTNodeJSX('default')}
      </div>
    );
  },
});
