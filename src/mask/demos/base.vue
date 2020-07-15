<template>
  <div :class="`${name}`">
    <t-cell-group title="Mask遮罩">
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 1">带背景遮罩</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 2">无背景遮罩</t-button>
      </t-cell>
    </t-cell-group>


    <t-mask v-show="cur== 1" />
    <t-mask v-show="cur== 2" transparent="true"  />

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-mask-base-demo`;
export default defineComponent({
  setup() {
    return {
      name: ref(name),
      cur: 0,
    };
  },
});
</script>
<style lang="less" scoped>
.t-mask-base-demo {
  background: #fff;
  position: relative;
  height: 100vh;
}
</style>
