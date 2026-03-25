<template>
  <t-cell title="地址" :note="note" arrow @click="showCascader" />
  <t-cascader
    v-model:visible="visible"
    :value="address"
    title="选择地址"
    :options="options"
    :load="loadOptions"
    @pick="onPick"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Toast, CascaderProps } from 'tdesign-mobile-vue';

const options = ref([
  {
    label: '深圳市',
    value: '440300',
    children: true,
  },
]);
const address = ref();
const visible = ref(false);
const note = ref('请选择地址');

const showToast = () => {
  Toast({
    theme: 'loading',
    message: '加载中...',
    direction: 'column',
    placement: 'bottom',
    duration: 10000,
    preventScrollThrough: true,
  });
};

const mockData: Record<string, any[]> = {
  '440300': [
    { value: '440304', label: '福田区', children: [] },
    { value: '440303', label: '罗湖区', children: [] },
    { value: '440305', label: '南山区', children: [] },
    { value: '440306', label: '宝安区', children: [] },
    { value: '440307', label: '龙岗区', children: [] },
    { value: '440308', label: '盐田区', children: [] },
    { value: '440309', label: '龙华区', children: [] },
    { value: '440310', label: '坪山区', children: [] },
    { value: '440311', label: '光明区', children: [] },
  ],
};

const loadOptions = (node: any): Promise<any[]> => {
  return new Promise((resolve) => {
    showToast();
    setTimeout(() => {
      resolve(mockData[node.value] || []);
      Toast.clear();
    }, 500);
  });
};

const onChange = (value: string, options: any): void => {
  note.value = options?.map((item: any) => item.label).join('/');
  visible.value = false;
};

const showCascader = (): void => {
  visible.value = true;
};

const onPick = (context: { level: number; value: string | number; index: number }): void => {
  console.log(`level: ${context.level}, value: ${context.value}, index: ${context.index}`);
};
</script>
