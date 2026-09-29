<template>
  <t-radio-group class="box" :default-value="radio" borderless direction="horizontal" @change="groupChangeFn">
    <t-radio name="radio" value="1" label="单选标题" />
    <t-radio name="radio" value="2" label="单选标题" />
    <t-radio name="radio" value="3" label="单选标题" />
  </t-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref('3');
const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};
</script>

<style scoped>
.radio-group-demo {
  background-color: var(--bg-color-demo, #fff);
}

.box {
  padding: 16px;
  background-color: var(--bg-color-demo, #fff);
}
</style>
