<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Preview 图片预览</h1>
    <p class="summary">图片全屏放大预览效果，包含全屏背景色、页码位置样式、增加操作等规范</p>
    <tdesign-demo-block title="01 类型" summary="图片预览类型">
      <div class="preview-demo">
        <t-button size="large" variant="outline" @click="tapShow"> 显示 </t-button>
        <t-button size="large" variant="outline" @click="tapImgList"> 图片列表 </t-button>
        <t-button size="large" variant="outline" @click="tapInitIndex"> 默认显示第二张图片 </t-button>
        <t-button size="large" variant="outline" @click="tapBackGround"> 显示 </t-button>
      </div>
    </tdesign-demo-block>
    <t-preview
      v-model:images="images"
      v-model="showViewer"
      :initial-index="initialIndex"
      :background-color="color"
      @change="change"
    ></t-preview>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, Ref } from 'vue';

export default defineComponent({
  setup() {
    const images: Ref<Array<string>> = ref([]);
    const showViewer = ref(false);
    const initialIndex = ref(0);
    const color = ref('rgba(0, 0, 0, .6)');

    function tapShow() {
      showViewer.value = true;
      images.value = [
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      ];
    }
    function tapImgList() {
      showViewer.value = true;
      initialIndex.value = 0;
      images.value = [
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      ];
    }

    function tapInitIndex() {
      showViewer.value = true;
      images.value = [
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      ];
      initialIndex.value = 1;
    }
    function tapBackGround() {
      showViewer.value = true;
      images.value = [
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      ];
      color.value = 'rgba(0, 0, 0, 1)';
    }
    /** 翻页页数变化 */
    function change(page: number) {
      console.log(`当前页数${page}`);
    }
    return { tapShow, tapImgList, tapInitIndex, tapBackGround, color, initialIndex, images, showViewer, change };
  },
});
</script>
<style lang="less" scoped>
.preview-demo {
  margin: 0 16px;
  .t-button {
    margin-bottom: 16px;
  }
}
</style>
