<template>
  <div>
    <t-radio-group :default-value="radio" class="radio-group-demo" @change="groupChangeFn">
      <t-radio name="radio" value="1" label="单选" :icon="checkRectangle"></t-radio>
      <t-radio name="radio" value="2" label="单选" :icon="checkRectangle"></t-radio>
    </t-radio-group>
  </div>
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
