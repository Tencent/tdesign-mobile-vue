<template>
  <div :class="name" @click="onClick">
    <div v-if="computedLeftIcon !== undefined" :class="`${name}__left-icon`">
      <component :is="computedLeftIcon"> </component>
    </div>
    <div v-if="hasLabel" :class="`${name}__label`">
      <slot name="label">
        <div v-if="label">{{ label }}</div>
        <div v-if="summary" :class="`${name}__summary`">{{ summary }}</div>
      </slot>
    </div>
    <div v-if="hasValue" :class="styleValue">
      <slot>
        <div v-if="value">{{ value }}</div>
      </slot>
    </div>
    <div v-if="computedIcon !== undefined" :class="`${name}__icon`">
      <component :is="computedIcon" > </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import config from '../config';
import TIconChevronRight from '../icon/chevron-right.vue';
import CellProps from './props';

const { prefix } = config;
const name = `${prefix}-cell`;

export default defineComponent({
  name,
  components: { TIconChevronRight },
  props: CellProps,
  emits: ['click'],
  setup(props, context) {
    const hasLabel = computed(() => {
      if (props.label) return true;
      return !!context.slots.label;
    });

    const hasValue = computed(() => {
      if (props.value) return true;
      return !!context.slots.default;
    });

    const computedIcon = computed(() => {
      if (typeof props.icon === 'function') {
        return props.icon();
      }
      if (!!context.slots.icon) {
        return context.slots.icon;
      }
      if (props.link) {
        return TIconChevronRight;
      }
      return undefined;
    });

    const computedLeftIcon = computed(() => {
      if (!!props.leftIcon) {
        return props.leftIcon();
      }
      if (!!context.slots.leftIcon) {
        return context.slots.leftIcon;
      }
      return undefined;
    });

    const styleValue = computed(() => [
      `${name}__value`,
      {
        [`${name}__left`]: props.valueAlign === 'left',
      },
    ]);

    const onClick = (e: Event) => context.emit('click', e);

    return {
      ...toRefs(props),
      name,
      styleValue,
      hasLabel,
      hasValue,
      computedIcon,
      computedLeftIcon,
      onClick,
    };
  },
});
</script>
