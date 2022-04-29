<template>
  <div class="component-wrap">
    <t-indexes :list="state.letter" @select="onSelect"> </t-indexes>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { letter } from './data';
import Toast from '../../toast';

export default defineComponent({
  setup() {
    const state = reactive({
      letter,
    });

    const onSelect = (indexes: { groupIndex: string; childrenIndex: number }) => {
      Toast(JSON.stringify(indexes));
    };

    return {
      state,
      onSelect,
    };
  },
});
</script>
<style lang="less">
.component-wrap {
  height: calc(100vh - 50px);
}
</style>
