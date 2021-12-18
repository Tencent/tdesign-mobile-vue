<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Swiper 轮播</h1>
    <p class="summary">用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置</p>
    <tdesign-demo-block title="01 类型" summary="轮播图的多种样式">
      <t-swiper
        :interval="3000"
        :autoplay="true"
        :navigation="{ type: 'bullets', showSlideBtn: false }"
        @change="handleChange"
      >
        <t-swiper-item class="swiper-item--demo"> item1 </t-swiper-item>
        <t-swiper-item style="background: blue" class="swiper-item--demo"> item2 </t-swiper-item>
        <t-swiper-item style="background: green" class="swiper-item--demo"> item3 </t-swiper-item>
      </t-swiper>
      <pagination-type />

      <demo-direction />

      <demo-control />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import PaginationType from './pagination-type.vue';
import Direction from './direction.vue';
import Control from './control.vue';

export default defineComponent({
  components: {
    'pagination-type': PaginationType,
    'demo-direction': Direction,
    'demo-control': Control,
  },
  setup() {
    const handleChange = (index: number) => {
      console.log('基础示例,页数变化到》》》', index);
    };
    return {
      handleChange,
    };
  },
});
</script>
<style lang="less">
.t-swiper {
  margin-bottom: 24px;
}
</style>
