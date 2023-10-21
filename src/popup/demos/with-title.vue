<template>
  <div class="popup-demo">
    <t-button block variant="outline" theme="primary" size="large" @click="visible = true"
      >底部弹出层-带标题及操作</t-button
    >
    <t-popup v-model="visible" placement="bottom" style="height: 258px">
      <div class="header">
        <div class="btn btn--cancel" aria-role="button" @click="onHide">取消</div>
        <div class="title">标题文字</div>
        <div class="btn btn--confirm" aria-role="button" @click="onHide">确定</div>
      </div>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const onHide = () => (visible.value = false);
</script>

<style lang="less" scoped>
.popup-demo {
  padding: 0 16px;
}

.header {
  display: flex;
  align-items: center;
  height: 116rpx;
}

.title {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
}

.btn {
  font-size: 16px;
  padding: 16px;
}

.btn--cancel {
  color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
}

.btn--confirm {
  color: #0052d9;
}
</style>
