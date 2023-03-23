<template>
  <t-footer :logo="logo2" text="Copyright © 2019-2023 TDesign.All Rights Reserved." />
  <t-footer :logo="logo1" text="Copyright © 2019-2023 TDesign.All Rights Reserved." />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const logo1 = ref({
  url: 'https://tdesign.gtimg.com/miniprogram/images/logo1.png',
});

const logo2 = ref({
  icon: 'https://tdesign.gtimg.com/miniprogram/images/logo2.png',
  title: '品牌页脚',
});
</script>
