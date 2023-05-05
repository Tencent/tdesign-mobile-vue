<template>
  <div class="avatar-group-demo">
    <t-avatar-group :max="5">
      <template #collapseAvatar>
        <user-add-icon style="font-size: 24px"></user-add-icon>
      </template>
      <t-avatar v-for="(url, index) in imageList" :key="index" shape="circle" :image="url"></t-avatar>
    </t-avatar-group>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { UserAddIcon } from 'tdesign-icons-vue-next';

const userAddIcon = () => h(UserAddIcon);
const imageList = ref([
  'https://tdesign.gtimg.com/mobile/demos/avatar_1.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_2.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_3.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_4.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_5.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_1.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_2.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_3.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_4.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_5.png',
]);
</script>

<style lang="less">
.avatar-group-demo {
  margin-left: 16px;
  margin-bottom: 16px;
}
</style>
