<template>
  <div>
    <t-radio-group v-model="radio" class="radio-group-demo" @change="groupChangeFn">
      <t-radio name="radio" value="1" label="单选" align="right" icon="stroke-line"></t-radio>
      <t-radio name="radio" value="2" label="单选" align="right" icon="stroke-line"></t-radio>
      <t-radio name="radio" value="3" label="单选" align="right" icon="stroke-line"></t-radio>
      <t-radio
        name="radio4"
        value="4"
        label="单选单选单选单选单选单选单选单选"
        align="right"
        icon="stroke-line"
      ></t-radio>
    </t-radio-group>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const radio = ref('2');

watch(
  () => radio.value,
  (val) => {
    console.log(val);
  },
);

const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};
</script>
<style>
.radio-group-demo {
  background: #fff;
}
</style>
