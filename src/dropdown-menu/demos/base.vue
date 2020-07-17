<template>
  <div :class="`${name}`">
    <t-cell-group title="单选下拉菜单">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item title="商品类别" :options="options1"></t-dropdown-item>
          <t-dropdown-item title="排序" :options="options1"></t-dropdown-item>
        </t-dropdown-menu>
      </t-cell>
      <t-cell value-align="left">
        <!-- <t-dropdown-menu
          :showOverlay="true"
          :list="barList"
          selectMode="single"
          optionsLayout="col3"
          :isChecked="false"
          v-if="false"
        />-->
      </t-cell>
      <t-cell value-align="left">
        <!-- <t-dropdown-menu
          :showOverlay="true"
          :list="barList"
          selectMode="multi"
          optionsLayout="col3"
          :isChecked="true"
          v-if="false"
        />-->
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import config from '../../config';
const { prefix } = config;
const name = `${prefix}-dropdown-menu-group`;

export default defineComponent({
  name,
  data() {
    return {
      options1: [{
        title: '全部商品',
        value: 'all',
      }, {
        title: '热销商品',
        value: 'hot',
      }],
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
