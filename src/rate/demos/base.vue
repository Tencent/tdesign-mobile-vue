<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Rate 按钮</h1>
    <p class="summary">评分组件，对内容进行快速评级操作，或内容评价的等级展示，目前常用为五星实心评价</p>
    <tdesign-demo-block title="01 类型" summary="实心评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current" clearable />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block>
      <p class="tdesign-mobile-demo-block__summary rate">自定义数量评分</p>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">自定义数量评分</div>
        <t-rate v-model="current1" :count="6" clearable />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block>
      <p class="tdesign-mobile-demo-block__summary rate">半星评分</p>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">半星评分</div>
        <t-rate v-model="current2" clearable allow-half />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block>
      <p class="tdesign-mobile-demo-block__summary rate">带描述评分</p>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current3" clearable show-text />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current4" clearable show-text :texts="texts" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block>
      <p class="tdesign-mobile-demo-block__summary rate">展示型评分</p>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">纯展示</div>
        <t-rate v-model="current5" readonly />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 规格" summary="评价规格" style="padding-bottom: 16px">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">评分 30</div>
        <t-rate v-model="current5" size="30px" clearable />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">评分 18</div>
        <t-rate v-model="current5" size="18px" clearable />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const current = ref(3);
    const current1 = ref(3);
    const current2 = ref(3.5);
    const current3 = ref(3);
    const current4 = ref(3);
    const current5 = ref(3);
    const current6 = ref(3.5);
    const texts = ref(['很差', '差', '一般', '好评', '优秀']);

    return {
      current,
      current1,
      current2,
      current3,
      current4,
      current5,
      current6,
      texts,
    };
  },
});
</script>

<style lang="less">
.rate-demo-cell {
  background-color: #fff;
  padding: 12px 16px;
  margin-top: 8px;
  line-height: 1;
  display: flex;
  align-items: center;
  &__label {
    font-size: 16px;
    margin-right: 8px;
  }
}
.tdesign-mobile-demo-block__summary.rate {
  margin-top: 8px;
}
</style>
