<template>
  <div class="cell-base">
    <t-cell-group>
     <t-cell>
        <t-progress :percentage="0" />
     
        <t-progress :percentage="30" />
     
         <t-progress :percentage="100" />
      
         <t-progress type="error" :percentage="88" />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-progress-demo`;

export default defineComponent({
  name,
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.cell-base{
  .t-progress{
    margin-bottom: 20px;
  }
}
</style>