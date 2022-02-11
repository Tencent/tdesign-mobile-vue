<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
