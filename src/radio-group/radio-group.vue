<template>
  <div :class="componentName" role="radiogroup">
    <template v-if="options">
      <radio
        v-for="(opt, idx) in groupOptions"
        :key="`radio-group-options-${idx}-${Math.random()}`"
        :name="name"
        :checked="value === opt.value"
        :disabled="'disabled' in opt ? opt.disabled : disabled"
        :value="opt.value"
        :label="opt.label"
      ></radio>
    </template>
    <slot v-if="!options"></slot>
  </div>
</template>

<script lang="ts">
import { provide, defineComponent, toRefs, computed, SetupContext } from 'vue';
import { useEmitEvent } from '../shared';
import RadioGroupProps from '../radio/radio-group-props';
import { RadioOption, RadioOptionObj, RadioValue } from '../radio/type';
import Radio from '../radio/radio.vue';
import config from '../config';

const { prefix } = config;
const componentName = `${prefix}-radio-group`;

export default defineComponent({
  name: componentName,
  components: { Radio },
  props: RadioGroupProps,
  emits: ['update:value', 'change'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const change = (val: RadioValue) => {
      emitEvent('update:value', val);
      emitEvent('change', val);
    };
    const groupOptions = computed(() => {
      return props.options?.map((option: RadioOption) => {
        let opt = option as RadioOptionObj;
        if (typeof option === 'string' || typeof option === 'number') {
          opt = { value: option, label: option.toString() };
        }
        return opt;
      });
    });
    provide('rootGroupProps', props);
    provide('rootGroupChange', change);
    return {
      ...toRefs(props),
      componentName,
      groupOptions,
    };
  },
});
</script>
