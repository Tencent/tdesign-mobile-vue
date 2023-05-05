<template>
  <div class="avatar-demo">
    <t-avatar class="avatar-example" image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"></t-avatar>
    <t-avatar
      class="avatar-example"
      image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
      shape="round"
    ></t-avatar>
  </div>
</template>

<style lang="less">
.avatar-demo {
  margin-left: 16px;
  margin-bottom: 16px;

  .avatar-example:not(:last-child) {
    margin-right: 64px;
  }
  .custom {
    .t-avatar__inner {
      background-color: #0052d9;
      color: #fff;
    }
  }
}
</style>
