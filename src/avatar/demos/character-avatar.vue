<template>
  <div class="avatar-demo">
    <t-avatar class="avatar-example external-class-content" aria-label="字符头像">A</t-avatar>
    <t-avatar class="avatar-example external-class-content" shape="round">A</t-avatar>
  </div>
</template>

<style lang="less">
.avatar-demo {
  margin-left: 16px;
  margin-bottom: 16px;

  .avatar-example:not(:last-child) {
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
