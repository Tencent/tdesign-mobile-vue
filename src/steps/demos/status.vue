<template>
  <div>
    <div class="summary">选项卡状态</div>
    <div class="steps-horizontal-demo-block">
      <t-steps :current="options.first" current-status="error" @change="onFirstChange">
        <t-step-item v-for="(_, index) in count" :key="index" :title="getTitle('first', index)" content="辅助信息" />
      </t-steps>
    </div>
    <div class="steps-horizontal-demo-block">
      <t-steps :current="options.second" current-status="error" @change="onSecondChange">
        <t-step-item v-for="(_, index) in count" :key="index" :title="getTitle('second', index)" content="辅助信息">
          <template #icon>
            <CartIcon size="20px" />
          </template>
        </t-step-item>
      </t-steps>
    </div>
    <div class="steps-horizontal-demo-block">
      <t-steps :current="options.third" theme="dot" current-status="error" @change="onThirdChange">
        <t-step-item v-for="(_, index) in count" :key="index" :title="getTitle('third', index)" content="辅助信息" />
      </t-steps>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { CartIcon } from 'tdesign-icons-vue-next';

const options = reactive({
  first: 1,
  second: 1,
  third: 1,
});
const count = ref(4);
const onFirstChange = (current: number) => {
  options.first = current;
};
const onSecondChange = (current: number) => {
  options.second = current;
};
const onThirdChange = (current: number) => {
  options.third = current;
};

const getTitle = (type: 'first' | 'second' | 'third', index: number) => {
  if (index === options[type]) {
    return '当前步骤';
  }
  if (index < options[type]) {
    return '已完成';
  }
  if (index > options[type]) {
    return '未完成';
  }
};
</script>
