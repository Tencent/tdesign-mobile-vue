<template>
  <a
    :href="disabled || !href ? undefined : href"
    :target="target"
    :class="linkClass"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <span v-if="prefixContent" :class="`${baseClass}__prefix-icon ${prefix}-class-prefix-icon`">
      <t-node :content="prefixContent"></t-node>
    </span>
    <span :class="`${baseClass}__content`">
      <t-node :content="linkContent"></t-node>
    </span>
    <span v-if="suffixContent" :class="`${baseClass}__suffix-icon ${prefix}-class-suffix-icon`">
      <t-node :content="suffixContent"></t-node>
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue';
import config from '../config';
import LinkProps from './props';
import { useEmitEvent, renderContent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-link`;

export default defineComponent({
  name,
  components: {
    TNode,
  },
  props: LinkProps,
  setup(props, context) {
    const baseClass = name;
    const emitEvent = useEmitEvent(props, context.emit);
    const _this = getCurrentInstance();
    const linkContent = computed(() => renderContent(_this, 'default', 'content'));
    const prefixContent = computed(() => renderTNode(_this, 'prefixIcon'));
    const suffixContent = computed(() => renderTNode(_this, 'suffixIcon'));

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) return;
      emitEvent('click', e);
    };

    const linkClass = [
      baseClass,
      `${baseClass}--${props.theme}`,
      `${name}--${props.size}`,
      {
        [`${name}--disabled`]: props.disabled,
        [`${name}--underline`]: props.underline,
        [`${name}--hover`]: props.hover && !props.disabled,
      },
    ];

    return {
      prefix,
      linkClass,
      baseClass,
      handleClick,
      linkContent,
      prefixContent,
      suffixContent,
    };
  },
});
</script>
