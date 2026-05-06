<template>
  <div class="tdesign-mobile-demo">
    <div class="example-segmented">
      <t-segmented v-model="value" block :options="options" @change="handleChange" />
    </div>
    <div class="example-segmented">
      <t-segmented v-model="valueWithIcon" block :options="optionsWithIcon" @change="handleChangeWithIcon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { HomeIcon } from 'tdesign-icons-vue-next';

const value = ref<string | number>(0);
const valueWithIcon = ref<string | number>(0);

const options = [
  { value: 0, label: '选项' },
  { value: 1, label: '选项' },
  { value: 2, label: '选项' },
];

const optionsWithIcon = [
  { value: 0, label: '选项', icon: () => h(HomeIcon) },
  { value: 1, label: '选项', icon: () => h(HomeIcon) },
  { value: 2, label: '选项', icon: () => h(HomeIcon) },
];

const handleChange = (value: string | number, selectedOption: any) => {
  console.log('onChange:', value, selectedOption);
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
