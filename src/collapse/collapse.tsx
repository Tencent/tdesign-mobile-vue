import { toRefs, provide, defineComponent, computed, Ref, ComputedRef } from 'vue';
import props from './props';
import config from '../config';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { useVModel } from '../shared';
import { CollapseValue, TdCollapseProps } from './type';

export interface CollapseProvide {
  activeValue: Ref<CollapseValue | undefined>;
  disabled: ComputedRef<boolean>;
  expandIcon: ComputedRef<TdCollapseProps['expandIcon']>;
  onPanelChange: (name: string | number, args: any) => void;
  defaultExpandAll: boolean;
}

const { prefix } = config;
const name = `${prefix}-collapse`;

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();

    const componentName = usePrefixClass('collapse');

    const { value, modelValue } = toRefs(props);
    const [activeValue, setActiveValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const calcActiveValues = (activeValues: any[], panelValue: any, expandMutex: boolean) => {
      const hit = activeValues.indexOf(panelValue);

      if (hit > -1) {
        return activeValues.filter((item) => item !== panelValue);
      }

      return expandMutex ? [panelValue] : activeValues.concat(panelValue);
    };

    const onPanelChange = (value: string | number, args: any) => {
      if (Array.isArray(activeValue.value)) {
        const val = calcActiveValues(activeValue.value, value, props.expandMutex);

        setActiveValue(val, args);
      }
    };

    const disabled = computed(() => props.disabled);
    const expandIcon = computed(() => props.expandIcon);
    const rootClass = computed(() => [componentName.value, `${componentName.value}--${props.theme}`]);

    provide<CollapseProvide>('collapse', {
      activeValue,
      disabled,
      expandIcon,
      onPanelChange,
      defaultExpandAll: props.defaultExpandAll,
    });
    provide('renderParentTNode', renderTNodeJSX);

    return () => <div class={rootClass.value}>{slots.default?.()}</div>;
  },
});
