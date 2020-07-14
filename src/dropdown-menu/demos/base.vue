<template>
  <div :class="`${name}`">
    <t-cell-group title="单选下拉菜单">
      <t-cell value-align="left">
        <t-dropdown-menu
          :showOverlay="true"
          :list="barList"
          selectMode="tree"
          optionsLayout="col3"
          :isChecked="false"
          v-if="true"
        />
      </t-cell>
      <t-cell value-align="left">
        <t-dropdown-menu
          :showOverlay="true"
          :list="barList"
          selectMode="single"
          optionsLayout="col3"
          :isChecked="false"
          v-if="false"
        />
      </t-cell>
      <t-cell value-align="left">
        <t-dropdown-menu
          :showOverlay="true"
          :list="barList"
          selectMode="multi"
          optionsLayout="col3"
          :isChecked="true"
          v-if="false"
        />
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
      radio: '1',
      barList: [
        { title: '全部商品', disabled: false, barActive: true },
        { title: '新款商品', disabled: true, barActive: false  },
      ],
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
