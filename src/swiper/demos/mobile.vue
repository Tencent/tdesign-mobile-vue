<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Swiper 轮播</h1>
    <p class="summary">用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置</p>
    <tdesign-demo-block title="01 类型" summary="轮播图的多种样式">
      <div style="padding: 0 16px">
        <t-swiper
          :interval="3000"
          :autoplay="true"
          :navigation="{ type: 'dots', showSlideBtn: false }"
          @change="handleChange"
        >
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/01.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/02.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/03.png" class="img" />
          </t-swiper-item>
        </t-swiper>

        <t-swiper :autoplay="false" :height="180" direction="vertical" :navigation="{ type: 'fraction' }">
          <t-swiper-item class="swiper-item--demo1">
            <img src="https://tdesign.gtimg.com/site/swiper/01.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo1">
            <img src="https://tdesign.gtimg.com/site/swiper/02.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo1">
            <img src="https://tdesign.gtimg.com/site/swiper/03.png" class="img" />
          </t-swiper-item>
        </t-swiper>

        <t-swiper :autoplay="false" :navigation="{ type: 'dots-bar' }">
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/01.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/02.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/03.png" class="img" />
          </t-swiper-item>
        </t-swiper>

        <t-swiper
          v-model:current="state.currentPage"
          :interval="3000"
          :autoplay="true"
          :navigation="{ showSlideBtn: true }"
        >
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/01.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/02.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/03.png" class="img" />
          </t-swiper-item>
        </t-swiper>
        <!-- no loop -->
        <t-swiper :interval="3000" :loop="false" :navigation="{ showSlideBtn: true }">
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/01.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/02.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/03.png" class="img" />
          </t-swiper-item>
        </t-swiper>
        <!-- <h2>异步内容</h2>
        <demo-async /> -->
        <!-- <t-swiper :interval="3000" :autoplay="true">
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/01.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/02.png" class="img" />
          </t-swiper-item>
          <t-swiper-item class="swiper-item--demo">
            <img src="https://tdesign.gtimg.com/site/swiper/03.png" class="img" />
          </t-swiper-item>
          <template #navigation>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </template>
        </t-swiper> -->
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
// import async from './async.vue';

export default defineComponent({
  components: {
    // 'demo-async': async,
  },
  setup() {
    const handleChange = (index: number) => {
      console.log('基础示例,页数变化到》》》', index);
    };
    const state: {
      currentPage: number;
    } = reactive({
      currentPage: 1,
    });
    return {
      current: 1,
      state,
      handleChange,
    };
  },
});
</script>
<style lang="less">
.t-swiper {
  margin-bottom: 24px;
}
.swiper-item--demo {
  img {
    height: 100%;
  }
}
.swiper-item--demo1 {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f33;
  font-size: 20px;
  color: #fff;

  img {
    height: 100%;
  }
}
</style>
