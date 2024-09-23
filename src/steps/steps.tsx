import { provide, defineComponent, reactive, ComponentInternalInstance, computed } from 'vue';
import props from './props';
import config from '../config';
import { TdStepsProps } from './type';
import { useDefault } from '../shared';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-steps`,
  props,
  emits: ['update:current', 'update:modelValue', 'change'],
  setup(props, context) {
    const stepsClass = usePrefixClass('steps');
    const baseClass = computed(() => [
      stepsClass.value,
      `${stepsClass.value}--${props.layout}`,
      `${stepsClass.value}--${props.sequence}`,
      { [`${stepsClass.value}--readonly`]: props.readonly },
    ]);
    const renderTNodeJSX = useTNodeJSX();

    const [current, setCurrent] = useDefault<TdStepsProps['current'], TdStepsProps>(
      props,
      context.emit,
      'current',
      'change',
    );

    interface TState {
      children: ComponentInternalInstance[];
    }

    const state: TState = reactive({
      children: [],
    });

    const relation = (child: ComponentInternalInstance) => {
      child && state.children.push(child);
    };

    const removeRelation = (child: ComponentInternalInstance) => {
      state.children = state.children.filter((item) => item !== child);
    };

    const onClickItem = (cur: TdStepsProps['current'], prev: TdStepsProps['current'], e: MouseEvent) => {
      setCurrent(cur, prev, { e });
    };

    provide('stepsProvide', {
      ...props,
      state,
      current,
      relation,
      removeRelation,
      onClickItem,
    });

    return () => {
      const renderContent = renderTNodeJSX('default') || null;
      return <div class={baseClass.value}>{renderContent}</div>;
    };
  },
});
