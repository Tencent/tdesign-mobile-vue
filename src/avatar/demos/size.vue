<template>
  <div class="tdesign-demo-avatar">
    <div class="avatar-demo">
      <t-avatar
        alt="示例图片"
        class="avatar-example--large"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        shape="circle"
        size="large"
      ></t-avatar>
      <t-avatar class="avatar-example--large external-class-content" shape="circle" size="large">A</t-avatar>
      <t-avatar :icon="userIcon" class="avatar-example--large" shape="circle" size="large"></t-avatar>
    </div>
    <div class="avatar-demo">
      <t-avatar
        alt="示例图片"
        class="avatar-example--medium"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        shape="circle"
        size="medium"
      ></t-avatar>
      <t-avatar class="avatar-example--medium external-class-content" shape="circle" size="medium">A</t-avatar>
      <t-avatar :icon="userIcon" class="avatar-example--medium" shape="circle" size="medium"></t-avatar>
    </div>
    <div class="avatar-demo">
      <t-avatar
        alt="示例图片"
        class="avatar-example--small"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        shape="circle"
        size="small"
      ></t-avatar>
      <t-avatar class="avatar-example--small external-class-content" shape="circle" size="small">A</t-avatar>
      <t-avatar :icon="userIcon" class="avatar-example--small" shape="circle" size="small"></t-avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';

const userIcon = () => h(UserIcon);
</script>

<style lang="less">
@import '../../_common/style/mobile/_variables';

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
      background-color: @brand-color;
      font-weight: 400;
    }
  }
}
</style>
