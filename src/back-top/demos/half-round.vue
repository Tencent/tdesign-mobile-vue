<template>
  <div class="button-group">
    <t-button
      v-bind="{
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        content: '半圆形返回顶部',
      }"
      @click="onBtnClick1('half-round')"
    />
  </div>
  <div :style="{ ...style }">
    <t-back-top v-show="visible" :theme="theme" text="返回顶部" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object,
    default: () => {},
  },
});
const theme = ref('half-round');
const emit = defineEmits(['close']);

const onBtnClick1 = (tem: string) => {
  theme.value = tem;
  emit('close');
  window.scrollTo(0, 1200);
};
</script>

<style lang="less" scoped>
.button-group {
  padding: 8px 16px 16px;
  .t-button {
    margin-bottom: 10px;
  }
}
</style>
