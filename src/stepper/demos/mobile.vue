<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Stepper 步进器</h1>
    <p class="summary">用户通过调整“+”按钮、“-”按钮、数字输入框来调整具体需要的数值，可设置最大值和最小值</p>
    <tdesign-demo-block title="01 类型" summary="基础步进器">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带单位步进器">
      <eventDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯步进器">
      <div style="margin-left: 16px">
        <t-stepper v-model="number1" theme="grey" :step="1" :min="0" :max="100" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 类型" summary="步进器状态">
      <disableDemo />
      <disableInputDemo />

      <div class="stepper-demo">
        <t-cell title="最大值">
          <t-stepper v-model="number2" :step="1" :min="0" :max="999" />
        </t-cell>
      </div>
      <div class="stepper-demo">
        <t-cell title="最小值">
          <t-stepper v-model="number3" :step="1" :min="0" :max="999" />
        </t-cell>
      </div>
      <div class="stepper-inline-demo">
        <t-stepper v-model="number4" theme="grey" :step="1" :min="0" :max="100" disabled />
        <t-stepper v-model="number5" theme="grey" :step="1" :min="0" :max="100" />
        <t-stepper v-model="number6" theme="grey" :step="1" :min="0" :max="100" />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import baseDemo from './base.vue';
import disableDemo from './disabled.vue';
import disableInputDemo from './disable-input.vue';
import eventDemo from './event.vue';

const number1 = ref(3);
const number2 = ref(999);
const number3 = ref(0);
const number4 = ref(3);
const number5 = ref(999);
const number6 = ref(0);
</script>
