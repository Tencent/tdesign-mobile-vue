<template>
  <div class="">
    <t-cell-group>
      <t-cell title="开关">
        <template #rightIcon>
          <t-switch v-model="value" label="描述信息"> </t-switch>
        </template>
      </t-cell>
      <t-cell title="开关">
        <template #rightIcon>
          <t-switch label="描述信息"> </t-switch>
        </template>
      </t-cell>
      <t-cell title="自定义颜色">
        <template #rightIcon>
          <t-switch :value="true" :colors="['rgba(0,168,112,1)', 'rgba(0,0,0,0.26)']" label="描述信息" />
        </template>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
