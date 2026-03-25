<template>
  <div class="popup-nested-demo">
    <t-button block variant="outline" theme="primary" size="large" @click="showParent = true"> 打开嵌套弹窗 </t-button>

    <!-- 父 Popup：attach 到 body -->
    <t-popup v-model="showParent" placement="bottom" :z-index="1500">
      <div ref="parentContentRef" class="parent-popup-content">
        <h3 class="popup-title">筛选面板（父弹窗）</h3>
        <p class="popup-desc">这是第一层 Popup，点击下方按钮可打开子弹窗。</p>
        <t-button block theme="primary" size="large" @click="showChild = true"> 打开子弹窗（Picker） </t-button>

        <!-- 子 Popup：attach 到父 Popup 内部的 DOM 容器 -->
        <t-popup v-model="showChild" placement="bottom" :attach="() => parentContentRef" :z-index="1600">
          <div class="child-popup-content">
            <h3 class="popup-title">选择器（子弹窗）</h3>
            <p class="popup-desc">这是第二层 Popup，通过将 attach 指向父 Popup 内部的 DOM 容器，实现正确的嵌套层级。</p>
            <t-button block theme="primary" size="large" @click="showChild = false"> 确认选择 </t-button>
          </div>
        </t-popup>
      </div>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showParent = ref(false);
const showChild = ref(false);
const parentContentRef = ref<HTMLElement>();
</script>

<style lang="less" scoped>
.popup-nested-demo {
  padding: 0 16px;
}

.parent-popup-content {
  position: relative;
  padding: 24px 16px;
  min-height: 300px;
}

.child-popup-content {
  padding: 24px 16px;
}

.popup-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px;
}

.popup-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px;
  line-height: 1.6;
}
</style>
