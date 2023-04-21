<template>
  <span :class="classes" :aria-disabled="disabled" role="button" @click="handleClick">
    <span :class="`${baseClass}__icon`">
      <icon v-if="iconIsString" :name="icon" />
      <t-node :content="iconContent"></t-node>
    </span>
    <span :class="`${baseClass}__text`">
      <template v-if="contentIsArray">
        {{ innerChecked ? content[0] : content[1] }}
      </template>
      <t-node v-else :content="tagContent"></t-node>
    </span>
    <span v-if="closable && !disabled" :class="`${baseClass}__icon-close`" @click="onClickClose">
      <close-icon />
    </span>
  </span>
</template>

<script lang="ts">
import { CloseIcon, Icon } from 'tdesign-icons-vue-next';
import { defineComponent, computed, toRefs, getCurrentInstance } from 'vue';
import config from '../config';
import CheckTagProps from './check-tag-props';
import { useEmitEvent, renderContent, renderTNode, TNode, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-check-tag`;

const CheckTag = defineComponent({
  name,
  components: {
    CloseIcon,
    TNode,
    Icon,
  },
  props: CheckTagProps,
  emits: ['change', 'click', 'update:checked', 'update:modelValue'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const internalInstance = getCurrentInstance();
    const tagContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));
    const baseClass = `${prefix}-tag`;

    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const iconIsString = computed(() => {
      return typeof props.icon === 'string';
    });

    const contentIsArray = computed(() => {
      if (Array.isArray(props.content) && props.content.length === 2) {
        return true;
      }
      return false;
    });

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--${props.shape}`,
      `${baseClass}--${innerChecked.value ? 'primary' : 'default'}`,
      `${baseClass}--${props.size}`,
      `${baseClass}--${props.variant}`,
      {
        [`${prefix}-is-closable ${baseClass}--closable`]: props.closable,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: props.disabled,
        [`${prefix}-is-checked ${baseClass}--checked`]: !props.disabled && innerChecked.value,
      },
    ]);

    const onClickClose = (e: MouseEvent): void => {
      if (!props.disabled) {
        emitEvent('close', { e });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled) {
        emitEvent('click', { e });
        setInnerChecked(!innerChecked.value);
      }
    };

    return {
      iconIsString,
      contentIsArray,
      baseClass,
      classes,
      onClickClose,
      handleClick,
      iconContent,
      tagContent,
      innerChecked,
    };
  },
});

export default CheckTag;
</script>
