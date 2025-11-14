<template>
  <div class="popup-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="visible = true"
      >底部弹出层-带标题及操作
    </t-button>
    <t-popup v-model="visible" placement="bottom" style="height: 258px">
      <div class="header">
        <div aria-role="button" class="btn btn--cancel" @click="onHide">取消</div>
        <div class="title">标题文字</div>
        <div aria-role="button" class="btn btn--confirm" @click="onHide">确定</div>
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
@import '../../_common/style/mobile/_variables';

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
  color: @brand-color;
}
</style>
