<template>
  <t-dropdown-menu>
    <t-dropdown-item v-model="treeValue1" label="树型双列" :options="optionsT1" options-layout="tree" multiple />
    <t-dropdown-item
      v-model="treeValue2"
      label="选项最多六字超出1"
      :options="optionsT2"
      options-layout="tree"
      multiple
    />
  </t-dropdown-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const buildTree = (length: number, ...childLengths: number[]) => {
  const tree: any[] = [];
  for (let i = 0; i < length; i++) {
    const item: any = {
      title: `选项 ${i + 1}`,
      value: `options_${i}`,
    };
    if (childLengths.length > 0) {
      const [childLength, ...moreChildLenthes] = childLengths;
      item.options = buildTree(childLength, ...moreChildLenthes);
    }
    tree.push(item);
  }
  return tree;
};

const optionsT1 = ref(buildTree(8, 4));
const optionsT2 = ref(buildTree(8, 8, 4));
const treeValue1 = ref(['options_1', ['options_1', 'options_2']]);
const treeValue2 = ref(['options_1', 'options_3', ['options_1', 'options_2']]);
</script>
