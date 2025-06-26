<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="first">
      <t-tab-panel value="first" label="选项" :icon="appIcon" />
      <t-tab-panel value="second" label="选项" :icon="appIcon" />

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
import { h } from 'vue';
import { IconFont, AppIcon } from 'tdesign-icons-vue-next';

const appIcon = () => h(AppIcon, { size: 'large', style: { marginRight: '3px' } });
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
