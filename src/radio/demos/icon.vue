<template>
  <t-radio class="block" default-checked label="单选" icon="line"></t-radio>
  <t-radio class="block" default-checked label="单选" icon="dot"></t-radio>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { CheckRectangleFilledIcon, CheckRectangleIcon } from 'tdesign-icons-vue-next';

const radio = ref('2');
const TiconCheckRectangleFilled = h(CheckRectangleFilledIcon);
const TiconCheckRectangle = h(CheckRectangleIcon);
const checkRectangle = [TiconCheckRectangleFilled, TiconCheckRectangle];

const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};
</script>

<style scoped>
.radio-group-demo {
  background-color: #fff;
}
</style>
