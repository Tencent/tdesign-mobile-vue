<template>
  <a
    :href="disabled || !href ? undefined : href"
    :target="target"
    :class="linkClass"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <span v-if="prefixContent" :class="`${name}__prefix-icon ${prefix}-class-prefix-icon`">
      <t-node :content="prefixContent"></t-node>
    </span>
    <span :class="`${name}__content`">
      <t-node :content="linkContent"></t-node>
    </span>
    <span v-if="suffixContent" :class="`${name}__suffix-icon ${prefix}-class-suffix-icon`">
      <t-node :content="suffixContent"></t-node>
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue';
import config from '../config';
import LinkProps from './props';
import { renderContent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-link`;

export default defineComponent({
  name,
  components: {
    TNode,
  },
  props: LinkProps,
  setup(props) {
    const baseClass = name;
    const _this = getCurrentInstance();
    const linkContent = computed(() => renderContent(_this, 'default', 'content'));
    const prefixContent = computed(() => renderTNode(_this, 'prefixIcon'));
    const suffixContent = computed(() => renderTNode(_this, 'suffixIcon'));

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) return;
      props.onClick?.(e);
    };

    const linkClass = computed(() => [
      name,
      `${name}--${props.theme || 'default'}`,
      `${name}--${props.size || 'medium'}`,
      {
        [`${name}--disabled`]: props.disabled,
        [`${name}--underline`]: props.underline,
        [`${name}--hover`]: props.hover && !props.disabled,
      },
    ]);

    return {
      prefix,
      linkClass,
      name,
      handleClick,
      linkContent,
      prefixContent,
      suffixContent,
    };
  },
});
</script>
