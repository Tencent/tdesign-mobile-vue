<template>
  <t-navbar title="标题" :fixed="false">
    <template #left-icon>
      <t-icon size="24px" name="chevron-left" class="btn-left" @click="handleBack" />
      <t-icon size="24px" name="close" @click="handleClose" />
    </template>
    <template #right-icon>
      <t-icon size="24px" name="ellipsis" @click="handleShowMore" />
    </template>
  </t-navbar>
</template>

<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const handleBack = () => {
  console.log('back-icon-click');
};

const handleClose = () => {
  console.log('close-icon-click');
};

const handleShowMore = () => {
  console.log('more-icon-click');
};
</script>
