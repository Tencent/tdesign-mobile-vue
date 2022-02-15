<template>
  <button
    :class="classes"
    :disabled="disabled"
    role="button"
    :aria-disabled="disabled"
    :aria-checked="innerChecked"
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
import { defineComponent, computed, toRefs, getCurrentInstance, SetupContext } from 'vue';
import config from '../config';
import CheckTagProps from './check-tag-props';
import { useEmitEvent, renderContent, renderTNode, TNode, useDefault, useToggle } from '../shared';
import { TdCheckTagProps } from './type';

const { prefix } = config;
const name = `${prefix}-check-tag`;

const CheckTag = defineComponent({
  name,
  components: {
    CloseIcon,
    TNode,
  },
  props: CheckTagProps,
  emits: ['change', 'click', 'update:checked', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const baseClass = `${prefix}-tag`;

    const { size, shape, disabled, closable } = toRefs(props);

    const [innerChecked] = useDefault<boolean, TdCheckTagProps>(props, context.emit, 'checked', 'change');
    const switchValues = [true, false];
    const { state, toggle } = useToggle(switchValues, innerChecked.value);

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
        [`${prefix}-is-checked ${baseClass}--checked`]: innerChecked.value,
      },
    ]);

    function handleClickClose(e: MouseEvent): void {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        emitEvent('close', e);
      }
    }

    const handleClick = (e: MouseEvent): void => {
      if (!disabled.value) {
        toggle();

        emitEvent('click', { e });
        innerChecked.value = state.value;
      }
    };

    return {
      baseClass,
      classes,
      handleClickClose,
      handleClick,
      iconContent,
      tagContent,
      innerChecked,
    };
  },
});

export default CheckTag;
</script>
