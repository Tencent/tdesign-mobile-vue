<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DropdownMenu 下拉菜单</h1>
    <p class="summary">向下弹出的菜单列表</p>
    <tdesign-demo-block title="01 类型" summary="单选下拉菜单">
      <t-dropdown-menu>
        <t-dropdown-item v-model="valueS" title="菜单名称" :options="optionsN" />
        <t-dropdown-item v-model="valueS" title="菜单名称" :options="optionsC" />
      </t-dropdown-menu>
    </tdesign-demo-block>
    <tdesign-demo-block summary="多选下拉菜单">
      <t-dropdown-menu>
        <t-dropdown-item v-model="valueM" title="单列" :options="optionsN" select-mode="multi" options-columns="1" />
        <t-dropdown-item
          v-model="valueM1"
          title="双列"
          :options="optionsN"
          select-mode="multi"
          options-layout="columns"
          options-columns="2"
        />
        <t-dropdown-item
          v-model="valueM2"
          title="三列"
          :options="optionsC"
          select-mode="multi"
          options-layout="columns"
          options-columns="3"
        />
      </t-dropdown-menu>
    </tdesign-demo-block>
    <tdesign-demo-block summary="单选下拉菜单">
      <t-dropdown-menu>
        <t-dropdown-item v-model="valueS" title="菜单名称" :options="optionsN" />
        <t-dropdown-item v-model="valueS" title="菜单名称" :options="optionsC" />
      </t-dropdown-menu>
    </tdesign-demo-block>
    <tdesign-demo-block summary="树形下拉菜单">
      <t-dropdown-menu>
        <t-dropdown-item
          v-model="treeValue1"
          title="菜单"
          :options="optionsT1"
          options-layout="tree"
          select-mode="multi"
        />
        <t-dropdown-item
          v-model="treeValue2"
          title="菜单"
          :options="optionsT2"
          options-layout="tree"
          select-mode="multi"
        />
        <t-dropdown-item v-model="treeValue3" title="菜单" :options="optionsT3" options-layout="tree" />
        <t-dropdown-item v-model="treeValue4" title="菜单" :options="optionsT4" options-layout="tree" />
      </t-dropdown-menu>
    </tdesign-demo-block>
    <div style="height: 300px" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

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
  setup() {
    const emptyArr = new Array(20).fill(null);
    const numberArr = emptyArr.map((_, i) => ({
      title: `选项 ${i + 1}`,
      value: `option_${i + 1}`,
    }));
    const charArr = emptyArr.map((_, i) => {
      const char = String.fromCharCode(65 + i);
      return {
        title: `选项 ${char}`,
        value: `options_${char}`,
      };
    });
    const optionsT1 = ref(buildTree(8, 4));
    const optionsT2 = ref(buildTree(8, 8, 4));
    const optionsT3 = ref(buildTree(8, 4));
    const optionsT4 = ref(buildTree(8, 8, 4));
    const treeValue1 = ref(null);
    const treeValue2 = ref(['options_1', 'options_3', ['options_2', 'options_3']]);
    const treeValue3 = ref(null);
    const treeValue4 = ref(null);
    const optionsN = ref(numberArr);
    const optionsC = ref(charArr);
    const valueS = ref('option_2');
    const valueM = ref(['options_A', 'options_C']);
    const valueM1 = ref(['options_A', 'options_C']);
    const valueM2 = ref(['options_A', 'options_C']);

    return {
      optionsN,
      optionsC,
      valueS,
      valueM,
      valueM1,
      valueM2,
      optionsT1,
      optionsT2,
      optionsT3,
      optionsT4,
      treeValue1,
      treeValue2,
      treeValue3,
      treeValue4,
    };
  },
});
</script>

<style lang="less" scoped>
.t-dropdown-menu {
  padding-top: 16px;
}
.dropdown-menu-wrap {
  background: #f5f5f5;
  .t-cell {
    padding: 0;

    // background: #f5f5f5;
    &:not(:last-child) {
      margin-bottom: 16px;
      &::after {
        display: none;
      }
    }
  }
}
</style>
