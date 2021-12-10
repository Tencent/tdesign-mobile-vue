<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Stepper 步进器</h1>
    <p class="summary">用户通过调整“+”按钮、“-”按钮、数字输入框来调整具体需要的数值，可设置最大值和最小值</p>
    <tdesign-demo-block title="01 类型" summary="基础步进器">
      <div class="stepper-demo">
        <t-stepper v-model.number="number1" label="标题文字" :step="1" :min="0" :max="100" @change="onChange" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带单位步进器">
      <div class="stepper-demo">
        <t-stepper v-model.number="number2" label="标题文字（单位）" :step="1" :min="0" :max="100" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯步进器">
      <div class="stepper-pure-demo">
        <t-stepper v-model.number="number3" theme="mode" :step="1" :min="0" :max="100" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 类型" summary="步进器状态"> </tdesign-demo-block>
    <tdesign-demo-block>
      <div class="stepper-demo">
        <t-stepper v-model.number="number4" label="禁用" :step="1" :min="0" :max="100" disabled />
      </div>
      <div class="stepper-demo">
        <t-stepper v-model.number="number5" label="禁用单位" :step="1" :min="0" :max="100" disabled />
      </div>
      <div class="stepper-demo">
        <t-stepper v-model.number="number6" label="最大值" :step="1" :min="0" :max="999" />
      </div>
      <div class="stepper-demo">
        <t-stepper v-model.number="number7" label="最小值" :step="1" :min="0" :max="999" />
      </div>
      <div class="stepper-demo">
        <t-stepper v-model.number="number3" theme="mode" :step="1" :min="0" :max="100" disabled />
        <t-stepper v-model.number="number6" theme="mode" :step="1" :min="0" :max="100" />
        <t-stepper v-model.number="number7" theme="mode" :step="1" :min="0" :max="100" />
      </div>
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
      number1: 1,
      number2: 9999,
      number3: 3,
      number4: 0,
      number5: 0,
      number6: 999,
      number7: 0,
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
