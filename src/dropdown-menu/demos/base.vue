<template>
  <div :class="`${name}`">
    <t-cell-group title="单选/多选下拉菜单">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item title="单选菜单" :options="options1N" v-model="value1S" />
          <t-dropdown-item title="多选菜单" :options="options1C" selectMode="multi" v-model="value1M" />
        </t-dropdown-menu>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="多选菜单分栏">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item
            title="两栏菜单"
            :options="options2N"
            selectMode="multi"
            optionsLayout="col2"
            @open="log('[menu open] menu item 2N')"
            @opened="log('[menu opened] menu item 2N')"
            @close="log('[menu close] menu item 2N')"
            @closed="log('[menu closed] menu item 2N')"
          />
          <t-dropdown-item
            title="三栏菜单"
            :options="options2C"
            selectMode="multi"
            optionsLayout="col3"
            @open="log('[menu open] menu item 2C')"
            @opened="log('[menu opened] menu item 2C')"
            @close="log('[menu close] menu item 2C')"
            @closed="log('[menu closed] menu item 2C')"
          />
        </t-dropdown-menu>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="树形选单/自定义内容">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item title="树形选单" :options="options3T" selectMode="tree" />
          <t-dropdown-item title="自定义内容">
            <t-cell-group>
              <t-cell label="开关 1">
                <t-switch v-model="value" text="描述信息"></t-switch>
              </t-cell>
              <t-cell label="开关 2">
                <t-switch text="描述信息"></t-switch>
              </t-cell>
              <t-cell label="开关 3">
                <t-switch disabled text="描述信息"></t-switch>
              </t-cell>
            </t-cell-group>
          </t-dropdown-item>
        </t-dropdown-menu>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="禁用选项">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item title="单选菜单" disabled />
          <t-dropdown-item title="多选菜单" disabled selectMode="multi" />
        </t-dropdown-menu>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';

import config from '../../config';
const { prefix } = config;
const name = `${prefix}-dropdown-menu-group`;

export default defineComponent({
  name,
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
    const tree = [{
      title: '一级选项 1',
      value: 'top_1',
      options: [],
    }, {
      title: '一级选项 2',
      value: 'top_2',
      options: [],
    }].map((child: any, i: number) => {
      const newChild = child;
      const childOptions = numberArr.map((child: any, j: number) => {
        const newChild = {
          ...child,
          title: `选项 ${i + 1}-${j + 1}`,
        };
        newChild.options = charArr.map((child: any, k: number) => ({
          ...child,
          title: `选项 ${i + 1}-${j + 1}-${k + 1}`,
        }));
        return newChild;
      });
      newChild.options = childOptions;
      return newChild;
    });
    const options1N = ref(numberArr);
    const options1C = ref(charArr);
    const options2N = ref(numberArr);
    const options2C = ref(charArr);
    const options3T = ref(tree);
    const value1S = ref('option_2');
    const value1M = ref(['options_A', 'options_C']);
    watch(() => value1S.value, (val: any) => {
      console.log('单选菜单 选中项:', val);
    });
    watch(() => value1M.value, (val: any) => {
      console.log('多选菜单 选中项:', val);
    });
    return {
      log: (...args: []) => {
        console.log(...args);
      },
      options1N,
      options1C,
      options2N,
      options2C,
      options3T,
      value1S,
      value1M,
    };
  },
});
</script>
<style lang="less" scoped>
.t-dropdown-menu-base-demo {
  background: #fff;
  position: relative;
  height: 100vh;
}
</style>
