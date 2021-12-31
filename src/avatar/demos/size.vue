<template>
  <div class="tdesign-demo-avatar">
    <div class="tdesign-demo-block">
      <t-avatar size='small'>U</t-avatar>
      <t-avatar size='medium'>U</t-avatar>
      <t-avatar size='large'>U</t-avatar>
      <t-avatar size='88px'>U</t-avatar>
    </div>
    <div class="tdesign-demo-block">
      <t-avatar shape="round" size='small'>U</t-avatar>
      <t-avatar shape="round" size='medium'>U</t-avatar>
      <t-avatar shape="round" size='large'>U</t-avatar>
      <t-avatar shape="round" size='88px'>U</t-avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="less" scoped>
  .tdesign-demo-avatar{
    .tdesign-demo-avatar-block:first-child{
      margin-bottom: 40px;
    }
    .t-avatar {
      margin-right: 40px;
    }
  }
</style>
