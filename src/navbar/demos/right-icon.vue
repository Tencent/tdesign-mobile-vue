<template>
  <t-navbar title="标题" left-icon :fixed="false" @left-click="handleBack">
    <template #right-icon>
      <t-icon size="24px" name="notification" class="btn-left" @click="handleNotify" />
      <t-icon size="24px" name="ellipsis" @click="handleShowMore" />
    </template>
  </t-navbar>
</template>

<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const handleBack = () => {
  console.log('left-click');
};

const handleNotify = () => {
  console.log('notification-icon-click');
};

const handleShowMore = () => {
  console.log('more-icon-click');
};
</script>
