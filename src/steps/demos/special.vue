<template>
  <div>
    <div class="summary">垂直自定义步骤条</div>
    <div class="steps-vertical-demo-block">
      <t-steps :current="options.first" layout="vertical" theme="dot" @change="onFirstChange">
        <t-step-item v-for="(_, index) in count1" :key="index" :title="getTitle('first', index)">
          <template #titleRight>
            <ChevronRightIcon size="22px" color="rgba(0, 0, 0, .4)" />
          </template>
        </t-step-item>
      </t-steps>

      <t-button style="margin-top: 32px; width: 100%" size="large" theme="light" @click="toNext">下一步</t-button>
    </div>

    <div class="summary">纯展示步骤条</div>
    <div class="steps-vertical-demo-block">
      <t-steps :current="options.second" layout="vertical" theme="dot" readonly @change="onSecondChange">
        <t-step-item v-for="(_, index) in count" :key="index" title="步骤展示" content="可自定义此处内容">
          <template #icon>
            <CartIcon size="20px" />
          </template>
        </t-step-item>
      </t-steps>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { CartIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';

const options = reactive({
  first: 3,
  second: 4,
});
const count1 = ref(4);
const count = ref(4);
const onFirstChange = (current: number) => {
  count1.value = current + 1;
  options.first = current;
};
const onSecondChange = (current: number) => {
  options.second = current;
};

const toNext = () => {
  count1.value += 1;
  options.first = count1.value - 1;
};

const getTitle = (type: 'first' | 'second' | 'third', index: number) => {
  if (index === options[type]) {
    return '当前步骤';
  }
  if (index < options[type]) {
    return '已完成步骤';
  }
  if (index > options[type]) {
    return '未完成';
  }
};
</script>
