<template>
  <div :class="classPrefix">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { toRefs, provide, SetupContext, defineComponent, computed, Ref, ComputedRef } from 'vue';
import props from './props';
import config from '../config';
import { toggleElem } from './util';
import { useEmitEvent, useVModel } from '../shared';
import { CollapseValue, TdCollapseProps } from './type';

export interface CollapseProvide {
  activeValue: Ref<CollapseValue | undefined>;
  disabled: ComputedRef<boolean>;
  expandIcon: ComputedRef<TdCollapseProps['expandIcon']>;
  onPanelChange: (name: string | number) => void;
  defaultExpandAll: boolean;
}

const { prefix } = config;
const name = `${prefix}-collapse`;
export default defineComponent({
  name,
  props,
  emits: ['update:value', 'change'],
  setup(props) {
    const { value, modelValue } = toRefs(props);
    const [activeValue, setActiveValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const onPanelChange = (name: string | number) => {
      let newVal;
      if (props.expandMutex) {
        newVal = [name];
      } else if (activeValue.value?.includes(name)) {
        newVal = activeValue.value.filter((item) => item !== name);
      } else {
        const exits = activeValue.value ?? [];
        newVal = [...exits, name];
      }
      setActiveValue(newVal);
    };

    const disabled = computed(() => props.disabled);
    const expandIcon = computed(() => props.expandIcon);

    provide<CollapseProvide>('collapse', {
      activeValue,
      disabled,
      expandIcon,
      onPanelChange,
      defaultExpandAll: props.defaultExpandAll,
    });

    return {
      prefix,
      classPrefix: name,
    };
  },
});
</script>

<style></style>
