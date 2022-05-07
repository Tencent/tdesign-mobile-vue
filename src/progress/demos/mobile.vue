<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Progress 进度条</h1>
    <p class="summary">展示操作的当前进度</p>
    <base-demo />
    <type-demo />
    <color-demo />
    <text-demo />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import BaseDemo from './base.vue';
import TextDemo from './text.vue';
import TypeDemo from './type.vue';
import ColorDemo from './color.vue';

export default defineComponent({
  components: {
    BaseDemo,
    TextDemo,
    TypeDemo,
    ColorDemo,
  },
});
</script>
<style lang="less" scoped></style>
