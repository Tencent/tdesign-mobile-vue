<template>
  <span :class="classes" :style="tagStyle" :aria-disabled="disabled" role="button" @click="handleClick">
    <span :class="`${baseClass}__icon`">
      <slot name="icon"></slot>
    </span>
    <span :class="`${baseClass}__text`">
      <slot v-if="slotDefault"></slot>
      <slot v-else name="content">
        {{ content }}
      </slot>
    </span>
    <span v-if="closable" :class="`${baseClass}__icon-close`" @click.stop="onClickClose">
      <close-icon />
    </span>
  </span>
</template>

<script lang="ts">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { defineComponent, computed, useSlots, toRefs } from 'vue';
import config from '../config';
import TagProps from './props';

const { prefix } = config;
const name = `${prefix}-tag`;

const Tag = defineComponent({
  name,
  components: {
    CloseIcon,
  },
  props: TagProps,
  emits: ['close', 'click'],
  setup(props) {
    const slotDefault = !!useSlots().default;
    const baseClass = name;

    const tagStyle = computed(() => {
      return props.maxWidth
        ? { maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth }
        : {};
    });

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--${props.theme}`,
      `${baseClass}--${props.shape}`,
      `${baseClass}--${props.variant}`,
      `${baseClass}--${props.size}`,
      {
        [`${prefix}-is-closable ${baseClass}--closable`]: props.closable,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: props.disabled,
      },
    ]);

    const onClickClose = (e: MouseEvent): void => {
      if (!props.disabled) {
        props.onClose?.({ e });
      }
    };

    const handleClick = (e: MouseEvent): void => {
      if (!props.disabled) {
        props.onClick?.({ e });
      }
    };

    return {
      ...toRefs(props),
      baseClass,
      classes,
      tagStyle,
      onClickClose,
      handleClick,
      slotDefault,
    };
  },
});

export default Tag;
</script>
