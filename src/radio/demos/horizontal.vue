<template>
  <t-radio-group class="box" :default-value="radio" borderless @change="groupChangeFn">
    <t-radio :block="false" name="radio" value="1" label="单选标题" />
    <t-radio :block="false" name="radio" value="2" label="单选标题" />
    <t-radio :block="false" name="radio" value="3" label="单选标题" />
  </t-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref('3');
const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};
</script>

<style>
.radio-group-demo {
  background-color: var(--bg-color-demo, #fff);
}

.box {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-color-demo, #fff);
}
</style>
