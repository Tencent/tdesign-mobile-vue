<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Stepper 步进器</h1>
    <p class="summary">用户通过调整“+”按钮、“-”按钮、数字输入框来调整具体需要的数值，可设置最大值和最小值</p>
    <tdesign-demo-block title="01 类型" summary="基础步进器">
      <t-stepper
        v-model.number="number1"
        label="标题文字"
        :step="1"
        :min="0"
        :max="100"
        :input-width="70"
        @change="onChange"
      />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带单位步进器">
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯步进器">
    </tdesign-demo-block>
    <tdesign-demo-block title="02 类型" summary="步进器状态">
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-stepper-demo`;

export default defineComponent({
  name,
  setup() {
    const state = reactive({
      number1: 10,
      number2: 9999,
      number3: 0,
      number4: 0,
      number5: 0,
    });
    const onChange = ($event: number) => {
      console.log(`change to ${$event}`);
    };
    return {
      onChange,
      ...toRefs(state),
    };
  },
});
</script>
