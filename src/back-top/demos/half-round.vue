<template>
  <div>
    <div class="button-group">
      <t-button block size="large" variant="outline" @click="onBtnClick1('half-round')">半圆白底</t-button>
      <t-button block size="large" variant="outline" @click="onBtnClick1('half-round-dark')">半圆黑底</t-button>
    </div>
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
