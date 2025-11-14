<template>
  <div class="avatar-demo">
    <t-avatar
      :badge-props="{ dot: true }"
      class="avatar-example"
      image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
    />
    <t-avatar :badge-props="{ count: 8, offset: [4, 4] }" class="avatar-example external-class-content">A</t-avatar>
    <t-avatar :badge-props="{ count: 12, offset: [4, 4] }" :icon="userIcon" class="avatar-example" />
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
