<template>
  <div class="popup-demo">
    <t-button block variant="outline" theme="primary" size="large" @click="visible = true"
      >居中弹出层-带自定义关闭按钮</t-button
    >
    <t-popup v-model="visible" placement="center" style="width: 240px; height: 240px">
      <t-icon class="close-btn" name="close-circle" size="32" color="#fff" @click="onClose" />
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const visible = ref(false);
const onClose = () => (visible.value = false);
</script>

<style lang="less">
.popup-demo {
  padding: 16px;
}

.close-btn {
  position: absolute;
  left: 50%;
  margin-left: -16px;
  bottom: calc(-1 * (24px + 32px));
}

.wrapper {
  margin: 16px;
  display: block;
}
</style>
>
