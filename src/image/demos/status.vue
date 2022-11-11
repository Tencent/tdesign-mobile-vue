<template>
  <div>
    <div class="image-group">
      <div class="image-demo">
        <t-image class="image-container"></t-image>
        <p class="image-demo-tip">默认提示</p>
      </div>
      <div class="image-demo">
        <t-image class="image-container">
          <template #loading>
            <t-icon-loading />
          </template>
        </t-image>
        <p class="image-demo-tip">自定义提示</p>
      </div>
    </div>
    <tdesign-demo-block title="" summary="加载失败提示">
      <div class="image-group">
        <div class="image-demo">
          <t-image class="image-container" src="x"></t-image>
          <p class="image-demo-tip">默认提示</p>
        </div>
        <div class="image-demo">
          <t-image lazy class="image-container" src="x">
            <template #error>
              <div class="error-text-tip">加载失败</div>
            </template>
          </t-image>
          <p class="image-demo-tip">自定义提示</p>
        </div>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { LoadingIcon as TIconLoading } from 'tdesign-icons-vue-next';
</script>

<style lang="less" scoped>
.image-group {
  display: flex;
  padding: 0 16px;
  flex-wrap: wrap;
  margin-bottom: -10px;
  .image-demo {
    margin-bottom: 10px;
    margin-right: 7%;
    width: 72px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .image-container {
      width: 100%;
      height: 72px;
      .error-text-tip {
        font-size: 12px;
      }
    }
    .image-demo-tip {
      color: #646566;
      font-size: 14px;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
