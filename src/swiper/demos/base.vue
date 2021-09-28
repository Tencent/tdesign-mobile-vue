<template>
  <div>
    <h3>基本用法</h3>
    <t-swiper @change="handleChange" :interval="3000" :autoplay="true" :navigation="{type: 'dot', showSlideBtn: false}">
      <t-swiper-item  class="swiper-item--demo">
        item1
      </t-swiper-item>
      <t-swiper-item  style="background: blue" class="swiper-item--demo">
        item2
      </t-swiper-item>
      <t-swiper-item  style="background: green" class="swiper-item--demo">
        item3
      </t-swiper-item>
    </t-swiper>
    <h3>指定分页器类型</h3>
    <pagination-type />
    <h3>垂直方向</h3>
    <demo-direction />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import PaginationType from './pagination-type.vue';
import Direction from './direction.vue';

export default defineComponent({
  components: {
    'pagination-type': PaginationType,
    'demo-direction': Direction,
  },
  setup() {
    const handleChange = (index: number) => {
      console.log(index);
    };
    return {
      handleChange,
    };
  },
});
</script>
<style lang="less">
  h3{
    margin: 10px 0;
  }
</style>
