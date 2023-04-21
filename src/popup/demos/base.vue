<template>
  <div class="popup-demo">
    <t-button v-for="p in placement" :key="p" block variant="outline" theme="primary" size="large" @click="onClick(p)">
      {{ p.text }}
    </t-button>
    <t-popup v-model="visible" :placement="currentPlacement" style="padding: 100px" />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';

const visible = ref(false);
const placement = [
  { value: 'top', text: '顶部弹出' },
  { value: 'left', text: '左侧弹出' },
  { value: 'center', text: '中间弹出' },
  { value: 'bottom', text: '底部弹出' },
  { value: 'right', text: '右侧弹出' },
];
const currentPlacement = ref('top');
const onClick = (item: any) => {
  currentPlacement.value = item.value;
  nextTick(() => (visible.value = true));
};
</script>

<style lang="less" scoped>
.popup-demo {
  padding: 0 16px;

  .t-button {
    margin-bottom: 16px;
  }
}
</style>
>
