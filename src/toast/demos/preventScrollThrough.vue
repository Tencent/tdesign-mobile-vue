<template>
  <div class="toast-demo">
    <t-button block size="large" variant="outline" @click="showPreventScrollThrough">禁止滑动和点击</t-button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Toast } from 'tdesign-mobile-vue';
import { PoweroffIcon } from 'tdesign-icons-vue-next';

const showPreventScrollThrough = () => {
  Toast({
    message: '禁止滑动和点击',
    direction: 'column',
    placement: 'bottom',
    duration: 5000,
    preventScrollThrough: true,
    icon: () => h(PoweroffIcon),
  });
};
</script>
