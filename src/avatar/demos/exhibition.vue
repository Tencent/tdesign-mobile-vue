<template>
  <div class="tdesign-demo-block">
    <div class="avatar-group-demo">
      <t-avatar-group cascading="right-up" :max="5" size="small">
        <t-avatar v-for="(url, index) in imageList" :key="index" shape="circle" :image="url"></t-avatar>
      </t-avatar-group>
    </div>
    <div class="avatar-group-demo">
      <t-avatar-group cascading="right-up" :max="5" size="40px">
        <t-avatar v-for="(url, index) in imageList" :key="index" shape="circle" :image="url"></t-avatar>
      </t-avatar-group>
    </div>
    <div class="avatar-group-demo">
      <t-avatar-group cascading="right-up" :max="5">
        <t-avatar v-for="(url, index) in imageList" :key="index" shape="circle" :image="url"></t-avatar>
      </t-avatar-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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
