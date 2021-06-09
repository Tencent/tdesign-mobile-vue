<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item
        v-model="treeValue1"
        title="两列多选"
        :options="optionsT1"
        options-layout="tree"
        select-mode="multi"
      />
      <t-dropdown-item
        v-model="treeValue2"
        title="三列多选"
        :options="optionsT2"
        options-layout="tree"
        select-mode="multi"
      />
    </t-dropdown-menu>
    <p>
      多选树形菜单（两列） 选中路径:
      <strong>{{ JSON.stringify(treeValue1) }}</strong>
    </p>
    <p>
      多选树形菜单（三列） 选中路径:
      <strong>{{ JSON.stringify(treeValue2) }}</strong>
    </p>
  </demo-container>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import DemoContainer from './demo-container.vue';

const buildTree = (length: number, ...childLengthes: number[]) => {
  const tree: any[] = [];
  for (let i = 0; i < length; i++) {
    const item: any = {
      title: `选项 ${i + 1}`,
      value: `options_${i}`,
    };
    if (childLengthes.length > 0) {
      const [childLength, ...moreChildLenthes] = childLengthes;
      item.options = buildTree(childLength, ...moreChildLenthes);
    }
    tree.push(item);
  }
  return tree;
};

export default defineComponent({
  components: {
    DemoContainer,
  },
  setup() {
    const optionsT1 = ref(buildTree(8, 4));
    const optionsT2 = ref(buildTree(8, 8, 4));
    const treeValue1 = ref(null);
    const treeValue2 = ref(['options_1', 'options_3', ['options_2', 'options_3']]);
    return {
      optionsT1,
      optionsT2,
      treeValue1,
      treeValue2,
    };
  },
});
</script>
