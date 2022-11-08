<template>
  <div class="button-group">
    <t-button block size="large" variant="outline" @click="onBtnClick('round', '顶部')">圆角白底</t-button>
    <t-button block size="large" variant="outline" @click="onBtnClick('round-dark', '顶部')">圆角黑底</t-button>
    <t-button block size="large" variant="outline" @click="onBtnClick('round', '')">圆白底纯图标</t-button>
    <t-button block size="large" variant="outline" @click="onBtnClick('round-dark', '')">圆黑底纯图标</t-button>
  </div>
  <t-back-top v-show="visible" :theme="theme" :text="text" />
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close']);
const theme = ref('round');
const text = ref('顶部');

const onBtnClick = (tem: string, txt: string) => {
  text.value = txt;
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
