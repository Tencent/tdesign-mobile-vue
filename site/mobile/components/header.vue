<template>
  <div v-show="title" class="tdesign-demo-topnav">
    <div class="tdesign-demo-topnav-title">{{ title }}</div>
    <chevron-left-icon class="tdesign-demo-topnav__back" @click="onBack" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';

const router = useRouter();
const title = computed(() => router.currentRoute.value.meta.title);

const onBack = () => {
  router.go(-1);
};
</script>
