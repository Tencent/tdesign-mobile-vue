<template>
  <div class="noticebar-demo">
    <t-notice-bar :visible="visible" :content="content" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const content = ref<string>('提示文字描述提示文字描述提示文字描述');
const visible = ref<boolean>(true);
</script>
