<template>
  <div>
    <t-cell-group class="dialog-type-title" title="backgroundColor: 设置遮罩的背景颜色">
      <t-cell value-align="left">
        <t-button theme="primary" @click="toggle"> 显示 </t-button>
        <t-image-viewer
          v-model="showViewer"
          :images="images"
          :initial-index="1"
          :background-color="color"
        ></t-image-viewer>
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
    return { loading, images, toggle, showViewer, color: 'rgba(0, 0, 0, 1)' };
  },
});
</script>
