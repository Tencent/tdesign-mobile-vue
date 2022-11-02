<template>
  <div class="tdesign-demo-avatar">
    <div class="avatar-demo">
      <t-avatar shape="circle" size="large" :icon="userIcon"></t-avatar>
      <t-avatar shape="circle" size="medium" :icon="userIcon"></t-avatar>
      <t-avatar shape="circle" size="small" :icon="userIcon"></t-avatar>
    </div>
    <div class="avatar-demo">
      <t-avatar
        shape="circle"
        size="large"
        image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
        alt="示例图片"
        :badge-props="{ count: 10 }"
      ></t-avatar>
      <t-avatar
        shape="circle"
        size="medium"
        image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
        alt="示例图片"
        :badge-props="{ count: 10 }"
      ></t-avatar>
      <t-avatar
        shape="circle"
        size="small"
        image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
        alt="示例图片"
        :badge-props="{ dot: true }"
      ></t-avatar>
    </div>
    <div class="avatar-demo">
      <t-avatar
        shape="round"
        size="large"
        image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
        alt="示例图片"
        :badge-props="{ count: 10 }"
      ></t-avatar>
      <t-avatar
        shape="round"
        size="medium"
        image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
        alt="示例图片"
        :badge-props="{ count: 10 }"
      ></t-avatar>
      <t-avatar
        shape="round"
        size="small"
        image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
        alt="示例图片"
        :badge-props="{ dot: true }"
      ></t-avatar>
    </div>
    <div class="avatar-demo">
      <t-avatar shape="circle" size="large" class="custom">A</t-avatar>
      <t-avatar shape="circle" size="medium" class="custom">A</t-avatar>
      <t-avatar shape="circle" size="small" class="custom">A</t-avatar>
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
  .t-avatar {
    margin-right: 20px;
  }
  .custom {
    .t-avatar__inner {
      background-color: #0052d9;
      color: #fff;
    }
  }
}
</style>
