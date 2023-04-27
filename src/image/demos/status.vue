<template>
  <div class="row">
    <div class="col">
      <p class="tips">加载默认提示</p>
      <t-image class="image-container" shape="round" />
    </div>
    <div class="col">
      <p class="tips">加载自定义提示</p>
      <t-image class="image-container" shape="round">
        <template #loading>
          <t-loading />
        </template>
      </t-image>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p class="tips">失败默认提示</p>
      <t-image class="image-container" src="x" shape="round" />
    </div>
    <div class="col">
      <p class="tips">失败自定义提示</p>
      <t-image lazy class="image-container" src="x" shape="round">
        <template #error>
          <div class="error-tips">加载失败</div>
        </template>
      </t-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Loading as TLoading } from 'tdesign-mobile-vue';
</script>

<style lang="less" scoped>
.row {
  display: flex;
  grid-gap: 24px;
  padding: 0 16px;
  margin-bottom: 24px;

  .image-container {
    width: 72px;
    height: 72px;
  }
}

.tips {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
  text-align: center;
  white-space: nowrap;
}

.error-tips {
  color: rgba(0, 0, 0, 0.4);
  font-size: 10px;
}
</style>
