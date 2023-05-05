<template>
  <div class="avatar-demo">
    <t-avatar class="avatar-example" :icon="userIcon"></t-avatar>
    <t-avatar class="avatar-example" shape="round" :icon="userIcon"></t-avatar>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';

const userIcon = () => h(UserIcon);
</script>

<style lang="less">
.avatar-demo {
  margin-left: 16px;
  margin-bottom: 16px;

  .avatar-example:not(:last-child) {
    margin-right: 32px;
  }
}
</style>
