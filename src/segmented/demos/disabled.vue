<template>
  <div class="tdesign-mobile-demo">
    <div class="example-segmented">
      <t-segmented v-model="value" disabled :options="['最近', '推荐', '热门']" @change="handleChange" />
    </div>

    <div class="example-segmented">
      <t-segmented v-model="valueWithDisabled" :options="optionsWithDisabled" @change="handleChangeDisabled" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<string | number>('最近');
const valueWithDisabled = ref<string | number>(1);

const optionsWithDisabled = [
  { value: 0, label: '周一' },
  { value: 1, label: '周二' },
  { value: 2, label: '周三', disabled: true },
  { value: 3, label: '周四' },
  { value: 4, label: '周五', disabled: true },
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
  padding: 16px;
}

.example-segmented + .example-segmented {
  margin-top: 16px;
}
</style>
