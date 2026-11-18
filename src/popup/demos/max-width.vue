<template>
  <div class="popup-max-width-demo">
    <t-button block variant="outline" theme="primary" @click="visible = true">自定义最大宽度</t-button>
    <t-popup v-model="visible" placement="bottom" :max-width="600" close-btn>
      <div class="popup-max-width-demo__content">
        <h3>自定义最大宽度</h3>
        <p>宽屏下最大宽度为 600px 并水平居中，窄屏下保持全宽。不传 maxWidth 时保留原有布局。</p>
        <t-button block theme="primary" @click="visible = false">关闭</t-button>
      </div>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<style lang="less" scoped>
.popup-max-width-demo {
  padding: 0 16px;

  &__content {
    padding: 32px 24px;

    p {
      margin: 16px 0 24px;
    }
  }
}
</style>
