<template>
  <t-notice-bar class="notice-bar-demo-block" visible :prefix-icon="false" marquee :content="content" />
  <t-notice-bar class="notice-bar-demo-block" visible marquee :content="content" />
  <t-notice-bar visible marquee :content="content1" direction="vertical">
    <template #prefixIcon>
      <SoundIcon />
    </template>
  </t-notice-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SoundIcon } from 'tdesign-icons-vue-next';

const content = ref<string>('提示文字描述提示文字描述提示文字描述提示文字描述文');
const content1 = ref(['君不见', '高堂明镜悲白发', '朝如青丝暮成雪', '人生得意须尽欢', '莫使金樽空对月']);
</script>
