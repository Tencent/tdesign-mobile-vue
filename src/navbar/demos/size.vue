<template>
  <t-navbar title="标题文字" :fixed="false" left-arrow>
    <template #right>
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>

  <t-navbar :fixed="false" left-arrow class="custom-navbar">
    <template #right>
      <t-icon name="home" size="24px" />
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>
  <div class="header-title">大尺寸标题</div>
</template>

<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';
</script>

<style lang="less" scoped>
.t-navbar {
  margin-bottom: 16px;
}

.custom-navbar {
  margin: 0;
}

.header-title {
  font-size: 28px;
  line-height: 36px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
  padding: 0px 20px 16px;
  background-color: #fff;
}

.t-icon-home {
  margin-right: 8px;
}
</style>
