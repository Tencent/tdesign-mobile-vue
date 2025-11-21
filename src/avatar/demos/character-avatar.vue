<template>
  <div class="avatar-demo">
    <t-avatar aria-label="字符头像" class="avatar-example external-class-content">A</t-avatar>
    <t-avatar class="avatar-example external-class-content" shape="round">A</t-avatar>
  </div>
</template>

<style lang="less">
@import '../../_common/style/mobile/_variables';

.avatar-demo {
  margin-left: 16px;
  margin-bottom: 16px;

  .avatar-example:not(:last-child) {
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
