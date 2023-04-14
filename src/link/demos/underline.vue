<template>
  <div class="tdesign-mobile-link-demo">
    <t-link theme="primary" underline @click="clickHandle">跳转链接</t-link>
    <t-link underline hover>跳转链接</t-link>
  </div>
</template>
<script lang="ts" setup>
const clickHandle = () => {
  console.log('click');
};
</script>
<style scoped>
.tdesign-mobile-link-demo {
  height: 12.8vw;
  background: #ffffffff;
  display: flex;
  justify-content: space-around;
  margin-bottom: 6.4vw;
  align-items: center;
}
</style>
