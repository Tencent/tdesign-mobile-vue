<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">ImageViewer 图片预览</h1>
    <p class="summary">图片全屏放大预览效果，包含全屏背景色、页码位置样式、增加操作等规范</p>
    <tdesign-demo-block title="01 类型" summary="图片预览类型">
      <div class="image-viewer-demo">
        <t-button block size="large" variant="outline" @click="tapShowBasic"> 基础用法 </t-button>
        <t-button block size="large" variant="outline" @click="tapShowCloseBtn"> 不展示关闭按钮 </t-button>
        <t-button block size="large" variant="outline" @click="tapShowCloseEvent"> 监听关闭事件 </t-button>
      </div>
    </tdesign-demo-block>
    <t-image-viewer v-model:images="images" v-model:visible="showViewer"></t-image-viewer>
    <t-image-viewer v-model:images="images" v-model:visible="showViewer2" :close-btn="false"></t-image-viewer>
    <t-image-viewer v-model:images="images" v-model:visible="showViewer3" @close="onClose"></t-image-viewer>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, Ref } from 'vue';
import { TdImageViewerProps } from '../type';

export default defineComponent({
  setup() {
    const images: Ref<Array<string>> = ref([
      'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
    ]);
    const showViewer = ref(false);
    const showViewer2 = ref(false);
    const showViewer3 = ref(false);

    function tapShowBasic() {
      showViewer.value = true;
    }
    function tapShowCloseBtn() {
      showViewer2.value = true;
    }

    function tapShowCloseEvent() {
      showViewer3.value = true;
    }

    function onClose(context: any) {
      console.log('onClose: ', context);
    }

    return { images, showViewer, showViewer2, showViewer3, tapShowBasic, tapShowCloseBtn, tapShowCloseEvent, onClose };
  },
});
</script>
<style lang="less" scoped>
.image-viewer-demo {
  margin: 0 16px;
  .t-button {
    margin-bottom: 16px;
  }
}
</style>
