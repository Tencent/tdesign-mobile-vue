<template>
  <div class="tdesign-mobile-demo">
    <div class="example-segmented">
      <t-segmented v-model="value" :options="optionsWithDisabled" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<string | number>(0);

const optionsWithDisabled = [
  { value: 0, label: '选中' },
  { value: 1, label: '默认' },
  { value: 2, label: '禁用', disabled: true },
];

const handleChange = (value: string | number, selectedOption: any) => {
  console.log('onChange:', value, selectedOption);
};

const handleChangeDisabled = (value: string | number, selectedOption: any) => {
  console.log('onChangeWithDisabled:', value, selectedOption);
};
</script>

<style scoped>
.tdesign-mobile-demo {
  padding-bottom: 0;
}

.example-segmented {
  background-color: var(--td-bg-color-container);
  padding: 8px 16px;
}

.example-segmented + .example-segmented {
  margin-top: 16px;
}
</style>
