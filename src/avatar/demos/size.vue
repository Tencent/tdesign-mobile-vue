<template>
  <div class="tdesign-demo-avatar">
    <div class="avatar-demo">
      <t-avatar
        class="avatar-example--large"
        shape="circle"
        size="large"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        alt="示例图片"
      ></t-avatar>
      <t-avatar class="avatar-example--large external-class-content" shape="circle" size="large">A</t-avatar>
      <t-avatar class="avatar-example--large" shape="circle" size="large" :icon="userIcon"></t-avatar>
    </div>
    <div class="avatar-demo">
      <t-avatar
        class="avatar-example--medium"
        shape="circle"
        size="medium"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        alt="示例图片"
      ></t-avatar>
      <t-avatar class="avatar-example--medium external-class-content" shape="circle" size="medium">A</t-avatar>
      <t-avatar class="avatar-example--medium" shape="circle" size="medium" :icon="userIcon"></t-avatar>
    </div>
    <div class="avatar-demo">
      <t-avatar
        class="avatar-example--small"
        shape="circle"
        size="small"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        alt="示例图片"
      ></t-avatar>
      <t-avatar class="avatar-example--small external-class-content" shape="circle" size="small">A</t-avatar>
      <t-avatar class="avatar-example--small" shape="circle" size="small" :icon="userIcon"></t-avatar>
    </div>
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

  .avatar-example--small:not(:last-child) {
    margin-right: 56px;
  }

  .avatar-example--medium:not(:last-child) {
    margin-right: 48px;
  }

  .avatar-example--large:not(:last-child) {
    margin-right: 32px;
  }
  .external-class-content {
    .t-avatar {
      color: #fff;
      background-color: #0052d9;
      font-weight: 400;
    }
  }
}
</style>
