<template>
  <t-cell title="选择时间" arrow hover :note="formattedTime || ''" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-picker v-model="pickerValue" :columns="columns" title="选择时间" @confirm="onConfirm" @cancel="onCancel" />
  </t-popup>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const visible = ref(false);
const pickerValue = ref([null]); // 修正初始值格式，去掉冒号

// 构造三列数据
const columns = computed(() => [hours, minutes, seconds]);

const hours = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}时`,
  value: String(i).padStart(2, '0'),
}));

const minutes = Array.from({ length: 60 }, (_, i) => ({
  label: `${i}分`,
  value: String(i).padStart(2, '0'),
}));

const seconds = Array.from({ length: 60 }, (_, i) => ({
  label: `${i}秒`,
  value: String(i).padStart(2, '0'),
}));

// 添加格式化计算属性
const formattedTime = computed(() => {
  return pickerValue.value.join(':');
});

const onConfirm = (value: string[]) => {
  pickerValue.value = value;
  visible.value = false;
};

const onCancel = () => {
  visible.value = false;
};
</script>
