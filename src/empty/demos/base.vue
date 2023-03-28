<template>
  <t-empty :icon="userIcon" description="描述文字" />
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { InfoCircleFilledIcon } from 'tdesign-icons-vue-next';

const userIcon = () => h(InfoCircleFilledIcon);
</script>
