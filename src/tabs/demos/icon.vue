<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="first">
      <t-tab-panel value="first">
        <template #label>
          <div class="label-content">
            <icon-font name="app" size="large" />
            <span>选项</span>
          </div>
        </template>
      </t-tab-panel>
      <t-tab-panel value="second">
        <template #label>
          <div class="label-content">
            <icon-font name="app" size="large" />
            <span>选项</span>
          </div>
        </template>
      </t-tab-panel>
      <t-tab-panel value="third">
        <template #label>
          <div class="label-content">
            <icon-font name="app" size="large" />
            <span>选项</span>
          </div>
        </template>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script lang="ts" setup>
import { IconFont } from 'tdesign-icons-vue-next';
</script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 16px;
}

.label-content {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 3px;
  }
}
</style>
