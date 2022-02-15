<template>
  <div v-show="showSticky" :class="stickyClasses" :style="stickyStyles">
    <t-node :content="stickyContent"></t-node>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import props from './props';
import config from '../config';
import { renderContent } from '@/shared';

const name = `${config.prefix}-sticky`;

const showSticky = computed(() => props.disabled);
const stickyClasses = computed(() => [`${name}`, {}]);
const stickyStyles = computed(() => {
  return {
    top: `${props.offsetTop}px`,
    'z-index': Number(props.zIndex),
  };
});
const stickyContent = computed(() => renderContent(getCurrentInstance(), 'default', 'content'));
</script>
