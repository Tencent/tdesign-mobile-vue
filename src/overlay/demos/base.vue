<template>
  <t-button size="large" block variant="outline" @click="overlayVisible1 = true">基础遮罩</t-button>
  <t-button size="large" block variant="outline" @click="overlayVisible2 = true">内嵌内容的遮罩</t-button>
  <t-overlay :visible="overlayVisible1" @click="overlayVisible1 = false" />
  <t-overlay :visible="overlayVisible2" transparent @click="overlayVisible2 = false">
    <div class="box"></div>
  </t-overlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const overlayVisible1 = ref(false);
const overlayVisible2 = ref(false);
</script>

<style lang="less" scoped>
.box {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: red;
  position: relative;
  left: 50%;
  top: 100px;
  margin-left: -50px;
}
</style>
