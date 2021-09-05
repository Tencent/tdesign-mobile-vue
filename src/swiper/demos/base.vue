<template>
  <div>
    <t-swiper>
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
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import PaginationType from './pagination-type.vue';

export default defineComponent({
  components: {
    'pagination-type': PaginationType,
  },
  setup() {
    
  },
})
</script>
<style lang="less">
  h3{
    margin: 10px 0;
  }
</style>
