<template>
  <t-check-tag
    v-for="(item, index) in items"
    :key="item.name"
    v-model:checked="item.checked"
    :disabled="item.disabled"
    @click="handleClick(index)"
    @change="handleChange"
    >{{ item.name }}
  </t-check-tag>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([
  {
    name: '选中',
    checked: true,
  },
  {
    name: '未选中',
    checked: false,
  },
  {
    name: '不可选',
    checked: false,
    disabled: true,
  },
]);

function handleClick(index: number) {
  items.value[index].checked = !items.value[index].checked;
}

function handleChange(checked: boolean) {
  console.log(checked);
}
</script>
