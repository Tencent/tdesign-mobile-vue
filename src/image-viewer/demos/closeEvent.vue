<template>
  <div class="image-viewer-demo">
    <t-button block size="large" variant="outline" @click="tapShow">监听关闭事件</t-button>
    <t-image-viewer v-model:images="images" v-model:visible="showViewer" @close="onClose"></t-image-viewer>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from 'vue';

const images: Ref<Array<string>> = ref([
  'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
  'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
  'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
]);
const showViewer = ref(false);

function tapShow() {
  showViewer.value = true;
}

function onClose(context: { trigger: 'close-btn' | 'overlay' | 'esc'; e: MouseEvent | KeyboardEvent }) {
  console.log('onClose: ', context);
}
</script>
<style lang="less" scoped>
.image-viewer-demo {
  margin: 0 16px;
  button {
    margin-bottom: 16px;
    background-color: #fff;
  }
}
</style>
