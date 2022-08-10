<template>
  <div>
    <t-cell-group class="dialog-type-title" title="不展示关闭按钮">
      <t-cell value-align="left">
        <t-button block size="large" variant="outline" @click="tapShow">不展示关闭按钮</t-button>
        <t-image-viewer v-model:images="images" v-model:visible="showViewer" :close-btn="false"></t-image-viewer>
      </t-cell>
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, Ref } from 'vue';

export default defineComponent({
  setup() {
    const images: Ref<Array<string>> = ref([
      'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
      'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
    ]);
    const showViewer = ref(false);

    function tapShow() {
      showViewer.value = true;
    }
    return { images, showViewer, tapShow };
  },
});
</script>
