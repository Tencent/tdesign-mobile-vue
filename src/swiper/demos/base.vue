<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Swiper 轮播</h1>
    <p class="summary">用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置</p>
    <tdesign-demo-block title="01 基本用法" summary="">
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
    </tdesign-demo-block>
    <tdesign-demo-block title="02 指定分页器类型" summary="">
      <pagination-type />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 垂直方向" summary="">
      <demo-direction />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 受控模式" summary="">
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
h3 {
  margin: 10px 0;
  color: #666;
  padding: 0 10px;
  font-size: 14px;
}
</style>
