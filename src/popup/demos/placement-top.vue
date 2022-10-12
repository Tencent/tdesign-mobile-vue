<template>
  <div class="popup-demo">
    <div class="button-group">
      <t-button block variant="outline" size="large" @click="top = true">顶部弹出</t-button>
    </div>
    <t-popup v-model="top" placement="top" :overlay-props="overlayProps">
      <div style="height: 200px; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const overlayProps = {
  customStyle: `background-color: rgba(0,0,0,.3)`, // 自定义遮罩层样式
};
const top = ref(false);
</script>

<style lang="less">
.popup-demo {
  .button-group {
    padding: 0 16px;
    .t-button {
      margin-bottom: 16px;
    }
  }
}
</style>
>
