<template>
  <div class="popup-demo">
    <div class="button-group">
      <t-button block variant="outline" size="large" @click="bottom = true">底部弹出</t-button>
    </div>
    <t-popup v-model="bottom" placement="bottom">
      <div style="height: 200px; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const bottom = ref(false);
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
