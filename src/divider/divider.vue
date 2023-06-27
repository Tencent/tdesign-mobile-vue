<template>
  <div :class="rootClass" role="separator">
    <div :class="`${name}__content`">
      <t-node :content="dividerContent" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineProps, getCurrentInstance } from 'vue';
import { renderContent, TNode } from '../shared';
import DividerProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-divider`;

export default {
  name,
};
</script>

<script lang="ts" setup>
const props = defineProps(DividerProps);
const internalInstance = getCurrentInstance();
const dividerContent = computed(() => renderContent(internalInstance, 'default', 'content'));
const rootClass = computed(() => [
  `${name}`,
  `${name}--${props.layout}`,
  `${name}--${props.align}`,
  {
    [`${name}--dashed`]: props.dashed,
  },
]);
</script>
