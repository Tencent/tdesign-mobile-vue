<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Rate 按钮</h1>
    <p class="summary">评分组件，对内容进行快速评级操作，或内容评价的等级展示，目前常用为五星实心评价</p>
    <tdesign-demo-block title="01 类型" summary="实心评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <BaseDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="空心评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate :default-value="demoValue[0]" variant="outline" clearable :gap="defaultGap" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义数量评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">自定义数量</div>
        <CountDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="半星评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">半星评价</div>
        <AllowHalfDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带描述评分">
      <div class="rate-demo-cell rate-demo-cell--space">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="demoValue[1]" clearable show-text :gap="defaultGap" />
      </div>
      <div class="rate-demo-cell rate-demo-cell--space">
        <div class="rate-demo-cell__label">请点击评分</div>
        <t-rate v-model="demoValue[2]" clearable show-text :texts="texts" :gap="defaultGap" />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">请点击评分</div>
        <TextDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="禁用评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">仅展示</div>
        <DisabledDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="设置评分颜色">
      <div class="rate-demo-cell rate-demo-cell--space">
        <div class="rate-demo-cell__label">空心评分</div>
        <t-rate v-model="demoValue[3]" variant="outline" clearable :color="['#FFC51C', '#E8E8E8']" :gap="defaultGap" />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">实心评分</div>
        <ColorDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 规格" summary="评价规格">
      <div class="rate-demo-cell rate-demo-cell--space">
        <div class="rate-demo-cell__label">评分20</div>
        <t-rate v-model="demoValue[4]" clearable :gap="defaultGap" />
      </div>
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">评分16</div>
        <SizeDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义图标评分">
      <div class="rate-demo-cell">
        <div class="rate-demo-cell__label">评分20</div>
        <IconDemo />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconDemo from './icon.vue';
import SizeDemo from './size.vue';
import ColorDemo from './color.vue';
import DisabledDemo from './disabled.vue';
import CountDemo from './count.vue';
import BaseDemo from './base.vue';
import TextDemo from './text.vue';
import AllowHalfDemo from './allow-half.vue';

const defaultGap = 8;
const demoValue = ref([2, 3, 3, 3, 3]);
const texts = ref(['很差', '差', '一般', '好评', '优秀']);
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
    margin-right: 16px;
    min-width: 80px;
  }

  &--space {
    margin-bottom: 16px;
  }
}
</style>
