<template>
  <span :class="classes" :aria-disabled="disabled" role="button" @click="handleClick">
    <span :class="`${baseClass}__icon`">
      <t-node :content="iconContent"></t-node>
    </span>
    <span :class="`${baseClass}__text`">
      <template v-if="contentIsArray && content">
        {{ innerChecked ? content[0] : content[1] }}
      </template>
      <t-node v-else :content="tagContent"></t-node>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, getCurrentInstance } from 'vue';
import config from '../config';
import CheckTagProps from './check-tag-props';
import { renderContent, renderTNode, TNode, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-check-tag`;

const CheckTag = defineComponent({
  name,
  components: {
    TNode,
  },
  props: CheckTagProps,
  emits: ['change', 'click', 'update:checked', 'update:modelValue'],
  setup(props) {
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

    const contentIsArray = computed(() => {
      if (Array.isArray(props.content) && props.content.length === 2) {
        return true;
      }
      return false;
    });

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--checkable`,
      `${baseClass}--${props.shape}`,
      `${baseClass}--${innerChecked.value ? 'primary' : 'default'}`,
      `${baseClass}--${props.size}`,
      `${baseClass}--${props.variant}`,
      {
        [`${prefix}-is-disabled ${baseClass}--disabled`]: props.disabled,
        [`${prefix}-is-checked ${baseClass}--checked`]: !props.disabled && innerChecked.value,
      },
    ]);

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled) {
        props.onClick?.({ e });
        setInnerChecked(!innerChecked.value);
      }
    };

    return {
      contentIsArray,
      baseClass,
      classes,
      handleClick,
      iconContent,
      tagContent,
      innerChecked,
    };
  },
});

export default CheckTag;
</script>
