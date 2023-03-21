<template>
  <t-footer :links="link1" text="Copright © 2019-2023 TDesign.All Rights Reserved." />
  <t-footer :links="link2" text="Copright © 2019-2023 TDesign.All Rights Reserved." />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const link1 = ref([
  {
    name: '底部链接',
    url: '/pages/index',
    openType: 'navigate',
  },
]);

const link2 = ref([
  {
    name: '底部链接',
    url: '/pages/index',
    openType: 'navigate',
  },
  {
    name: '底部链接',
    url: '/pages/index',
    openType: 'navigate',
  },
]);
</script>
