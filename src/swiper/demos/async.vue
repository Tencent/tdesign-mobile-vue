<template>
  <div class="tdesign-mobile-demo">
    <div style="padding: 0 16px">
      <t-swiper :navigation="{ type: 'dots-bar', showSlideBtn: true }">
        <t-swiper-item v-for="item in state.imgList" :key="item" class="swiper-item--demo">
          <img :src="item" class="img" />
        </t-swiper-item>
      </t-swiper>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
// import PaginationType from './pagination-type.vue';
// import Direction from './direction.vue';

export default defineComponent({
  setup() {
    const state: {
      imgList: string[];
    } = reactive({
      imgList: [],
    });
    onMounted(() => {
      setTimeout(() => {
        state.imgList = [
          'https://tdesign.gtimg.com/site/swiper/01.png',
          'https://tdesign.gtimg.com/site/swiper/02.png',
          'https://tdesign.gtimg.com/site/swiper/03.png',
        ];
      }, 3000);
    });
    return {
      state,
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
</style>
