<template>
  <div class="flex align-center margin-right">
    <t-button theme="primary" :icon="iconFunc" :disabled="disabled"></t-button>
    <t-button theme="primary" shape="round" :icon="iconFunc" :disabled="disabled"></t-button>
  </div>
  <div class="flex align-center margin-right">
    <t-button theme="primary" shape="square" :icon="iconFunc" :disabled="disabled"></t-button>
    <t-button theme="primary" shape="circle" :icon="iconFunc" :disabled="disabled"></t-button>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, defineProps, h } from 'vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';

const props = defineProps({
  disabled: Boolean,
});

const { disabled } = toRefs(props);
const iconFunc = () => h(TIconApp);
</script>
