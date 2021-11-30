<template>
  <div>
    <t-cell-group class="dialog-type-title" title="显示和隐藏">
      <t-cell value-align="left">
        <t-button theme="primary" @click="toggle">
          {{ showViewer ? '隐藏' : '显示'}}
        </t-button>
        <t-image-viewer
          v-model="showViewer"
          :images="images"
          :initial-index="0"
        ></t-image-viewer>
      </t-cell>
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, Ref } from 'vue';

export default defineComponent({
  setup() {
    const images: Ref<Array<string>> = ref([]);
    const showViewer = ref(false);
    function toggle() {
      showViewer.value = !showViewer.value;
      images.value =  ['https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png'];
    }
    return { images, toggle, showViewer };
  },
});
</script>
