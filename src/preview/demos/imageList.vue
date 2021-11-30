<template>
  <div>
    <t-cell-group class="dialog-type-title" title="图片数组：images">
      <t-cell value-align="left">
        <t-button theme="primary" @click="toggle">
          图片列表
        </t-button>
        <t-image-viewer
          v-model="showViewer"
          v-model:images="images"
          :initial-index="0"
          @input="input"
          @change="change"></t-image-viewer>
      </t-cell>
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, Ref } from 'vue';

export default defineComponent({
  setup() {
    const loading = ref(true);
    const images: Ref<Array<string>> = ref([]);
    const showViewer = ref(false);
    function toggle() {
      images.value = [
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      ];
      showViewer.value = !showViewer.value;
    }
    /** 翻页页数变化 */
    function change(page: number) {
      console.log(`当前页数${page}`);
    }
    function input() {
      showViewer.value = false;
    }
    return { loading, images, toggle, showViewer, change, input };
  },
});
</script>
