<template>
  <div class="tdesign-mobile-link-demo">
    <t-link theme="primary" underline hover>
      <template #prefixIcon>
        <link-icon />
      </template>
      跳转链接
    </t-link>
    <t-link>
      <template #prefixIcon>
        <link-icon />
      </template>
      跳转链接
    </t-link>
  </div>
</template>
<script lang="ts" setup>
import { LinkIcon } from 'tdesign-icons-vue-next';
</script>

<style scoped>
.tdesign-mobile-link-demo {
  height: 12.8vw;
  background: #ffffffff;
  display: flex;
  justify-content: space-around;
  margin-bottom: 6.4vw;
  align-items: center;
}
</style>
