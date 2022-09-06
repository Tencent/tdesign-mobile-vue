<template>
  <div class="">
    <t-cell-group>
      <t-cell title="开关">
        <template #rightIcon>
          <t-switch :value="checked"></t-switch>
        </template>
      </t-cell>
      <t-cell title="开关">
        <template #rightIcon>
          <t-switch :value="checked2" @change="onChange"> </t-switch>
        </template>
      </t-cell>
      <t-cell title="自定义颜色">
        <template #rightIcon>
          <t-switch :default-value="true" :colors="['rgba(0,168,112,1)', 'rgba(0,0,0,0.26)']"></t-switch>
        </template>
      </t-cell>
      <t-cell title="异步操作">
        <template #rightIcon>
          <t-switch v-model="checked3"> </t-switch>
        </template>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(true);
const checked2 = ref(false);
const checked3 = ref(true);

const onChange = (val: any) => {
  console.log(`onChange to ${val}`);
  checked2.value = val;
};
</script>
