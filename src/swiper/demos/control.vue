<template>
  <div>
    <t-swiper
      v-model:current="state.currentPage"
      :interval="3000"
      :autoplay="true"
      :navigation="{ type: 'bullets', showSlideBtn: true }"
    >
      <t-swiper-item class="swiper-item--demo"> item1 </t-swiper-item>
      <t-swiper-item style="background: blue" class="swiper-item--demo"> item2 </t-swiper-item>
      <t-swiper-item style="background: green" class="swiper-item--demo"> item3 </t-swiper-item>
    </t-swiper>
    <p class="summary">
      手动指定页数：
      <t-button size="small" theme="primary" @click="handleSwitch(0)">第一页</t-button>
      <t-button size="small" theme="default" @click="handleSwitch(1)">第二页</t-button>
      <t-button size="small" theme="primary" @click="handleSwitch(2)">第三页</t-button>
    </p>
    <p class="summary">当前页 {{ state.currentPage }}</p>
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
      currentPage: number;
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
p {
  padding: 10px;
  color: #666;
  font-size: 14px;
}
</style>
