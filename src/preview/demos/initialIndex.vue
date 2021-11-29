<template>
  <div>
    <t-cell-group class="dialog-type-title" title="initialIndex: 默认展示第二张图片">
      <t-cell value-align="left">
        <t-button theme="primary" @click="toggle(1)">
          默认展示
        </t-button>
        <t-image-viewer
          v-model="showViewer"
          :images="images"
          :initial-index="initialIndex"></t-image-viewer>
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
    const initialIndex = ref(0);
    function toggle(index: number) {
      images.value = [
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      ];
      showViewer.value = !showViewer.value;
      initialIndex.value = index;
    }
    return { loading, images, toggle, showViewer, initialIndex };
  },
});
</script>
