<template>
  <t-button block size="large" variant="outline" theme="primary" @click="visible = true">基础图片预览</t-button>
  <t-image-viewer v-model:images="images" :visible="visible" @index-change="onIndexChange" @close="onClose">
    <!-- <template #cover>cover</template> -->
    <template #image="{ src, className, onLoad, onTransitionstart, onTransitionend, style }">
      <div>
        <img
          :src="src"
          :style="style"
          :className="className"
          @load="onLoad"
          @transitionstart="onTransitionstart"
          @transitionend="onTransitionend"
        />
      </div>
    </template>
  </t-image-viewer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ImageViewerCloseTrigger } from 'tdesign-mobile-vue';

const visible = ref(false);
const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];

const onIndexChange = (index: number, context: { trigger: 'prev' | 'next' }) => {
  console.log('onIndexChange', index, context);
};

const onClose = (context: { trigger: ImageViewerCloseTrigger; visible: boolean; index: number }) => {
  if (context.trigger !== 'image') {
    visible.value = false;
  }
};
</script>

<style lang="less">
img,
video {
  // disable desktop browser image drag
  -webkit-user-drag: none;
}
</style>
