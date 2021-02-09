<template>
  <div :class="name" @click="onClick">
    <div v-if="hasLeftIcon" :class="`${name}__left-icon`">
      <component :is="leftIcon()" v-if="icon"> </component>
      <slot v-else name="leftIcon"> </slot>
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
    <div v-if="hasIcon" :class="`${name}__icon`">
      <component :is="icon()" v-if="icon"> </component>
      <slot v-else name="icon">
        <TIconChevronRight v-if="link" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, SetupContext, defineComponent, PropType, toRefs } from 'vue';
import config from '../config';
import { TdCellProps } from './cell.interface';
import TIconChevronRight from '@/icon/chevron-right.vue';
const { prefix } = config;
const name = `${prefix}-cell`;

export default defineComponent({
  name,
  components: { TIconChevronRight },
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    valueAlign: {
      type: String as PropType<TdCellProps['valueAlign']>,
      default: 'right',
      validator(val: string): boolean {
        return ['left', 'right'].includes(val);
      },
    },
    icon: {
      type: Function as PropType<TdCellProps['icon']>,
      default: undefined,
    },
    leftIcon: {
      type: Function as PropType<TdCellProps['leftIcon']>,
      default: undefined,
    },
    link: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props: TdCellProps, context: SetupContext) {
    const hasLabel = computed(() => {
      if (props.label) return true;
      return !!context.slots.label;
    });

    const hasValue = computed(() => {
      if (props.value) return true;
      return !!context.slots.default;
    });

    const hasIcon = computed(() => props.icon !== undefined || !!context.slots.icon || props.link);

    const hasLeftIcon = computed(() => props.leftIcon !== undefined || !!context.slots.leftIcon);

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
      hasIcon,
      hasLeftIcon,
      onClick,
    };
  },
});
</script>
