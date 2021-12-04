<template>
  <div>
    <t-swiper
      :interval="3000"
      :autoplay="true"
      :defaultCurrent=2
      :navigation="{type: 'bullets', showSlideBtn: true}">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import PaginationType from './pagination-type.vue';
import Direction from './direction.vue';

export default defineComponent({
  components: {
    'pagination-type': PaginationType,
    'demo-direction': Direction,
  },
  setup() {
    const state: {
      currentPage: number
    } = reactive({
      currentPage: 1,
    });
    const handleSwitch = (index: number) => {
      state.currentPage = index;
    };
    return {
      current: 1,
      state,
      handleSwitch,
    };
  },
});
</script>
<style lang="less" scoped>
  h3{
    margin: 10px 0;
  }
  p{
    padding: 10px;
    color: #666;
    font-size: 14px;
  }
</style>
