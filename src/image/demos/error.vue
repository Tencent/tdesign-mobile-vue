<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
