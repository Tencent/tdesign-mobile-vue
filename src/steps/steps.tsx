import { provide, defineComponent, reactive, ComponentInternalInstance, computed, toRefs } from 'vue';
import props from './props';
import config from '../config';
import { TdStepsProps } from './type';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { useFormReadonly } from '../form/hooks';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-steps`,
  props,
  emits: ['update:current', 'update:modelValue', 'change'],
  setup(props, context) {
    const stepsClass = usePrefixClass('steps');
    const isReadonly = useFormReadonly();
    const baseClass = computed(() => [
      stepsClass.value,
      `${stepsClass.value}--${props.layout}`,
      `${stepsClass.value}--${props.sequence}`,
      { [`${stepsClass.value}--readonly`]: isReadonly.value },
    ]);
    const renderTNodeJSX = useTNodeJSX();

    const { current, modelValue } = toRefs(props);
    const [innerCurrent, setInnerCurrent] = useVModel(
      current,
      modelValue,
      props.defaultCurrent,
      props.onChange,
      'current',
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
      setInnerCurrent(cur, prev, { e });
    };

    provide('stepsProvide', {
      ...props,
      state,
      current: innerCurrent,
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
