<template>
  <div>
    <t-swiper pagination-type="fraction">
      <t-swiper-item class="swiper-item--demo">
        itme1
      </t-swiper-item>
      <t-swiper-item style="background: blue" class="swiper-item--demo">
        item2
      </t-swiper-item>
      <t-swiper-item style="background: green" class="swiper-item--demo">
        item3
      </t-swiper-item>
    </t-swiper>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    
  },
})
</script>
<style lang="less">
  .swiper-item--demo{
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f33;
    font-size: 20px;
    color: #fff;
  }
</style>
