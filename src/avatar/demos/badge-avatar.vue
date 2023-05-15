<template>
  <div class="avatar-demo">
    <t-avatar
      class="avatar-example"
      image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
      :badge-props="{ dot: true, offset: [4, 4] }"
    />
    <t-avatar class="avatar-example external-class-content" :badge-props="{ count: 8, offset: [6, 6] }">A</t-avatar>
    <t-avatar class="avatar-example" :icon="userIcon" :badge-props="{ count: 12, offset: [6, 6] }" />
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
  .external-class-content {
    .t-avatar {
      color: #fff;
      background-color: #0052d9;
      font-weight: 400;
    }
  }
}
</style>
