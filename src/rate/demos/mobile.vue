<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Rate 按钮</h1>
    <p class="summary">评分组件，对内容进行快速评级操作，或内容评价的等级展示，目前常用为五星实心评价</p>
    <tdesign-demo-block title="01 类型" summary="基础评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
          <t-rate v-model="current" size="16px" clearable />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
          <t-rate v-model="current" clearable />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current" variant="outline" />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">自定义数量</div>
        <t-rate v-model="current1" :count="4" clearable />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">半星评分</div>
        <t-rate v-model="current2" clearable allow-half  />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带描述评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current3" clearable show-text />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current4" clearable show-text :texts="texts" />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current4" clearable show-text :texts="texts" variant="outline" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="展示型评分">
      <t-rate v-model="current5" disabled style="margin-left: 32px;" />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 规格" summary="实心评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current6" size="16px" />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current6" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="空心评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current6" size="16px" variant="outline" />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current6" variant="outline" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义数量">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current6" size="16px" :count="4" />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="current6" :count="4" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="半星评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">半星评分</div>
        <t-rate v-model="current7" size="16px" allow-half />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">半星评分</div>
        <t-rate v-model="current7" allow-half />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const current = ref(3);
    const current1 = ref(3);
    const current2 = ref(3.5);
    const current3 = ref(3);
    const current4 = ref(3);
    const current5 = ref(3);
    const current6 = ref(3);
    const current7 = ref(3.5);
    const texts = ref(['很差', '差', '一般', '好评', '优秀']);

    return {
      current,
      current1,
      current2,
      current3,
      current4,
      current5,
      current6,
      current7,
      texts,
    };
  },
});
</script>

<style lang="less">
.rate-demo-cell {
  background-color: #fff;
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  &__label {
    font-size: 16px;
    margin-right: 8px;
    min-width: 80px;
  }
}
.tdesign-mobile-demo-block__summary.rate {
  margin-top: 8px;
}
</style>
