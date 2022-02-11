<template>
  <button
    :class="classes"
    :disabled="disabled"
    role="button"
    :aria-disabled="disabled"
    :aria-checked="checked"
    @click="handleClick"
  >
    <div :class="`${baseClass}__icon`">
      <t-node :content="iconContent"></t-node>
    </div>
    <div :class="`${baseClass}__text`">
      <t-node :content="tagContent"></t-node>
    </div>
    <close-icon v-if="closable && !disabled" :class="`${baseClass}__close`" @click="handleClickClose" />
  </button>
</template>

<script lang="ts">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { defineComponent, computed, toRefs, getCurrentInstance } from 'vue';
import config from '../config';
import CheckTagProps from './check-tag-props';
import { emitEvent, renderContent, renderTNode, TNode, useToggle } from '../shared';

const { prefix } = config;
const name = `${prefix}-check-tag`;

const CheckTag = defineComponent({
  name,
  components: {
    CloseIcon,
    TNode,
  },
  props: CheckTagProps,
  emits: ['change', 'click', 'close', 'update:checked'],
  setup(props, context) {
    const baseClass = `${prefix}-tag`;

    const { size, shape, disabled, closable } = toRefs(props);

    const switchValues = [true, false];
    const { state, toggle } = useToggle(switchValues, props.checked || props.defaultChecked);
    const checked = computed(() => state.value === switchValues[1]);

    const internalInstance = getCurrentInstance();
    const tagContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--checkable`,
      `${baseClass}--${shape.value}`,
      {
        [`${baseClass}--size-${size.value}`]: size.value,
        [`${prefix}-is-closable ${baseClass}--closable`]: closable.value,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: disabled.value,
        [`${prefix}-is-checked ${baseClass}--checked`]: state.value,
      },
    ]);

    function handleClickClose(e: MouseEvent): void {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        emitEvent(props, context, 'close', e);
      }
    }

    const handleClick = (e: MouseEvent): void => {
      if (!disabled.value) {
        toggle();

        emitEvent(props, context, 'click', { e });
        emitEvent(props, context, 'change', state.value);
        context.emit('update:checked', state.value);
      }
    };

    return {
      baseClass,
      classes,
      handleClickClose,
      handleClick,
      iconContent,
      tagContent,
      checked,
    };
  },
});

export default CheckTag;
</script>
