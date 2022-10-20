<template>
  <div class="tdesign-demo-block">
    <div class="avatar-demo">
      <t-avatar :icon="userIcon"></t-avatar>
      <t-avatar
        image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
        alt="示例图片"
        :hide-on-load-failed="false"
      ></t-avatar>
      <t-avatar>
        <template #icon>
          <img src="https://tdesign.gtimg.com/mobile/demos/avatar_1.png" alt="示例图片" />
        </template>
      </t-avatar>
      <t-avatar image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png" shape="round"></t-avatar>
      <t-avatar class="custom">A</t-avatar>
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
