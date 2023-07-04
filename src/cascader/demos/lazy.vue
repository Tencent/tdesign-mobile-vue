<template>
  <t-cell title="地址" :note="note" arrow @click="showCascader" />
  <t-cascader
    v-model:visible="visible"
    :value="address"
    title="选择地址"
    :options="data"
    @pick="onPick"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Toast from '../../toast/index';

const data = ref([
  {
    label: '深圳市',
    value: '440300',
    children: [] as any[],
  },
]);
const options = computed(() => {
  return data.value;
});
const address = ref();
const visible = ref(false);
const note = ref('请选择地址');

const onPick = (value: string) => {
  const values = JSON.parse(JSON.stringify(value));
  if (
    options.value[values.index] &&
    values.value === options.value[values.index].value &&
    options.value[values.index].children?.length === 0
  ) {
    Toast({
      theme: 'loading',
      message: '加载中...',
      direction: 'column',
      placement: 'bottom',
      duration: 10000,
      preventScrollThrough: true,
    });
    // 模拟数据请求
    setTimeout(() => {
      data.value[0].children = [
        { value: '440304', label: '福田区' },
        { value: '440303', label: '罗湖区' },
        { value: '440305', label: '南山区' },
        { value: '440306', label: '宝安区' },
        { value: '440307', label: '龙岗区' },
        { value: '440308', label: '盐田区' },
        { value: '440309', label: '龙华区' },
        { value: '440310', label: '坪山区' },
        { value: '440311', label: '光明区' },
      ];
      Toast.clear();
    }, 1000);
  }
};
const onChange = (value: string, options: any) => {
  note.value = options?.map((item: any) => item.label).join('/');
  visible.value = false;
};

const showCascader = () => {
  visible.value = true;
};
</script>
