<template>
  <div class="toast-demo">
    <t-button block size="large" variant="outline" @click="showText(text1)">纯文本</t-button>
    <t-button block size="large" variant="outline" @click="showWithIcon(text1, 'row')">带图标-横向</t-button>
    <t-button block size="large" variant="outline" @click="showWithIcon(text1, 'column')">带图标-竖向</t-button>
    <t-button block size="large" variant="outline" @click="showText(text2)">纯文本最大高度</t-button>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

const text1 = ref('轻提示文字内容');
const text2 = ref('最多一行展示十个汉字宽度限制最多不超过三行文字行文字行文字');
const showText = (message: string) => {
  Toast(message);
};
const showWithIcon = (message: string, direction: any) => {
  Toast({
    icon: () => h(UserIcon),
    direction,
    duration: 10000,
    message,
  });
};
</script>
