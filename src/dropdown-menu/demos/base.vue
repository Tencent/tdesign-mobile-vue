<template>
  <div :class="`${name}`">
    <t-cell-group title="单选下拉菜单">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item title="商品类别" :options="options1"></t-dropdown-item>
          <t-dropdown-item title="排序" :options="options2"></t-dropdown-item>
        </t-dropdown-menu>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="多选下拉菜单">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item title="商品类别" :options="options1"></t-dropdown-item>
          <t-dropdown-item title="排序" :options="options2"></t-dropdown-item>
        </t-dropdown-menu>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

import config from '../../config';
const { prefix } = config;
const name = `${prefix}-dropdown-menu-group`;

export default defineComponent({
  name,
  setup() {
    const options1 = ref([{
      title: '全部商品',
      value: 'all',
    }, {
      title: '热销商品',
      value: 'hot',
    }]);
    const options2 = ref([{
      title: '发布时间',
      value: 'time',
    }, {
      title: '销量',
      value: 'sells',
    }]);
    return {
      options1,
      options2,
    };
  }
});
</script>
<style lang="less" scoped>
.t-dropdown-menu-base-demo {
  background: #fff;
  position: relative;
  height: 100vh;
}
</style>
