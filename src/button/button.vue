<template>
  <button :class="classes" :disabled="disabled" @click="onClick">
    <t-icon v-if="displayIcon" :name="displayIcon" :class="iconClass" />
    <span v-if="!iconOnly" :class="textClass">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { ref, computed, toRefs, SetupContext, defineComponent, PropType } from 'vue';
// import { TNode } from '../shared';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-button`;

export enum ButtonShape {
  Square = 'square',
  Round = 'round',
  Circle = 'circle',
}

export default defineComponent({
  name,
  props: {
    theme: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'default',
    },
    icon: {
      type: [String, Function],
      default: '',
    },
    plain: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    shape: {
      type: String as PropType<ButtonShape>,
      default: ButtonShape.Round,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, context: SetupContext) {
    const { loading } = toRefs(props);
    const iconOnly = computed(() => !context.slots.default);

    const textClass = computed(() => [`${name}__text`]);
    const iconClass = ref(`${name}__icon`);

    const classes = computed(() => [
      `${name}`,
      `${name}--${props.theme}`,
      {
        [`${name}--size-${props.size}`]: props.size,
        [`${name}--square`]: props.shape.valueOf() === ButtonShape.Square.valueOf(),
        [`${name}--circle`]: props.shape.valueOf() === ButtonShape.Circle.valueOf(),
        [`${prefix}-is-block`]: props.block,
        [`${prefix}-is-disabled`]: props.disabled,
        [`${prefix}-is-loading`]: props.loading,
        [`${prefix}-is-plain`]: props.plain,
      },
    ]);

    const displayIcon = computed(() => (loading.value ? 'loading' : props.icon));
    const onClick = (e: Event) => {
      if (!props.loading && !props.disabled) {
        // 既不是加载也不是禁用时触发事件
        context.emit('click', e);
      } else {
        e.stopPropagation();
      }
    };

    return {
      classes,
      textClass,
      iconClass,
      iconOnly,
      displayIcon,
      ...toRefs(props),
      onClick,
    };
  },
});
</script>
