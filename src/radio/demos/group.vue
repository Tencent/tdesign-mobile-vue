<template>
  <div>
    <t-radio-group v-model:value="radio" @change="groupChangeFn">
      <t-radio name="radio" value="1" label="单选" :icon="circleFilledIcons"></t-radio>
      <t-radio
        name="radio"
        value="2"
        label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
        :icon="circleFilledIcons"
      ></t-radio>
      <t-radio
        name="radio"
        value="3"
        label="单选"
        content="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
        :icon="circleFilledIcons"
      ></t-radio>
    </t-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, h, watch } from 'vue';
import { CheckCircleFilledIcon, CircleIcon } from 'tdesign-icons-vue-next';

const radio = ref('1');
const TIconCircleFilled = h(CheckCircleFilledIcon);
const TIconCircle = h(CircleIcon);

watch(
  () => radio.value,
  (val) => {
    console.log(val);
  },
);

const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};

const circleFilledIcons = [TIconCircleFilled, TIconCircle];
</script>
