<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Stepper 步进器</h1>
    <p class="summary">用户通过调整“+”按钮、“-”按钮、数字输入框来调整具体需要的数值，可设置最大值和最小值</p>
    <tdesign-demo-block title="01 类型" summary="基础步进器">
      <div class="stepper-demo">
        <t-cell title="标题文字">
          <t-stepper
            v-model="number1"
            :step="1"
            :min="0"
            :max="100"
            @overlimit="onOverlimit"
            @change="onChange"
            @blur="onBlur"
          />
        </t-cell>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带单位步进器">
      <div class="stepper-demo">
        <t-cell title="标题文字（单位）">
          <template #rightIcon>
            <t-stepper v-model.number="number2" :step="1" :min="0" :max="100" />
          </template>
        </t-cell>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯步进器">
      <div style="margin-left: 16px">
        <t-stepper v-model.number="number3" theme="grey" :step="1" :min="0" :max="100" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 类型" summary="步进器状态">
      <div class="stepper-demo">
        <t-cell title="禁用">
          <t-stepper v-model.number="number4" :step="1" :min="0" :max="100" disabled />
        </t-cell>
      </div>
      <div class="stepper-demo">
        <t-cell title="禁用单位">
          <t-stepper v-model.number="number5" :step="1" :min="0" :max="100" disabled />
        </t-cell>
      </div>
      <div class="stepper-demo">
        <t-cell title="最大值">
          <t-stepper v-model.number="number6" :step="1" :min="0" :max="999" />
        </t-cell>
      </div>
      <div class="stepper-demo">
        <t-cell title="最小值">
          <t-stepper v-model.number="number7" :step="1" :min="0" :max="999" />
        </t-cell>
      </div>
      <div class="stepper-inline-demo">
        <t-stepper v-model.number="number3" theme="grey" :step="1" :min="0" :max="100" disabled />
        <t-stepper v-model.number="number6" theme="grey" :step="1" :min="0" :max="100" />
        <t-stepper v-model.number="number7" theme="grey" :step="1" :min="0" :max="100" />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      number1: 1,
      number2: 99,
      number3: 3,
      number4: 0,
      number5: 0,
      number6: 999,
      number7: 0,
    });
    const onChange = ($event: number) => {
      console.log(`change to ${$event}`);
    };
    const onBlur = ($event: number) => {
      console.log(`blur to ${$event}`);
    };
    const onOverlimit = ($type: string) => {
      console.log(`onOverlimit ${$type}`);
    };
    return {
      onChange,
      onBlur,
      onOverlimit,
      ...toRefs(state),
    };
  },
});
</script>
