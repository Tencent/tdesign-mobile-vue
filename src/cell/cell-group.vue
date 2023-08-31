<template>
  <div>
    <div v-if="titleContent" :class="`${name}__title`">
      <t-node :content="titleContent" />
    </div>
    <div :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineProps, computed, getCurrentInstance } from 'vue';
import { renderTNode, TNode } from '../shared';
import CellGroupProps from './cell-group-props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-cell-group`;

export default {
  name,
  components: { TNode },
};
</script>

<script lang="ts" setup>
const props = defineProps(CellGroupProps);
const internalInstance = getCurrentInstance();
const titleContent = computed(() => renderTNode(internalInstance, 'title'));
const contentClass = computed(() => [name, `${name}--${props.theme}`, { [`${name}--bordered`]: props.bordered }]);
</script>
