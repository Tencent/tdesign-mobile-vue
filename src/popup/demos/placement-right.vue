<template>
  <div class="popup-demo">
    <div class="button-group">
      <t-button block variant="outline" size="large" @click="right = true">右侧弹出</t-button>
    </div>
    <t-popup v-model="right" placement="right">
      <div style="width: 200px; height: 100%; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const right = ref(false);
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
