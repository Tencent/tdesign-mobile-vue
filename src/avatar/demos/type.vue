<template>
  <div class="tdesign-demo-block">
    <div class="avatar-demo">
      <t-avatar :image="image" :hide-on-load-failed="false"></t-avatar>
      <t-avatar :icon="userIconFunc"></t-avatar>
      <t-avatar>
        <template #icon>
          <user-icon />
        </template>
      </t-avatar>
      <t-avatar>U</t-avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserIcon } from 'tdesign-icons-vue-next';

const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
const userIconFunc = () => UserIcon;
</script>

<style lang="less">
.avatar-demo {
  margin-left: 16px;
  margin-bottom: 16px;
  .t-avatar {
    margin-right: 20px;
  }
}
</style>
