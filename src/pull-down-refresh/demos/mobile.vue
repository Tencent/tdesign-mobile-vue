<template>
  <div>
    <BaseDemo />
    <TimeoutDemo />
    <LoadingTextsDemo />
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import TimeoutDemo from './timeout.vue';
import LoadingTextsDemo from './loading-texts.vue';
</script>

<style lang="less">
.tdesign-mobile-demo {
  background-color: #fff;

  &-block__slot {
    margin-top: 0;
  }
}
</style>
