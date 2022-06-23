<template>
  <div>
    <t-radio-group v-model="radio" class="radio-group-demo" @change="groupChangeFn">
      <t-radio name="radio" value="1" label="单选" icon="stroke-line"></t-radio>
      <t-radio name="radio" value="2" label="单选" icon="stroke-line"></t-radio>
      <t-radio
        name="radio3"
        value="3"
        label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
        icon="stroke-line"
      ></t-radio>
      <t-radio
        name="radio3"
        value="4"
        label="单选"
        content="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
        icon="stroke-line"
      ></t-radio>
    </t-radio-group>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref('1');

const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};
</script>
<style>
.radio-group-demo {
  background: #fff;
}
</style>
