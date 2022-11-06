<template>
  <div class="noticebar-demo">
    <!-- 不带静态图标 -->
    <t-notice-bar :visible="visible" :prefix-icon="false" marquee :content="content" />
    <!-- 默认带静态图标 -->
    <t-notice-bar :visible="visible" marquee :content="content" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const content = ref<string>('提示文字描述提示文字描述提示文字描述');
const visible = ref<boolean>(true);
</script>
