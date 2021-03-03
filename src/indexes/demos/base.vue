<template>
  <div class="component-wrap">
    <t-indexes :index-list="state.indexLists">
      <div v-for="item in state.indexLists" :key="item">
        <t-indexes-anchor :index='item' :title="`标题${item}`"></t-indexes-anchor>
        <t-indexes-cell
          v-for="n in 10"
          :key="n"
          :value="String(n)"
          :title="`此处使用列表样式${n}`"
          @click="handleClick"></t-indexes-cell>
      </div>
    </t-indexes>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      indexLists: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V','W', 'X', 'Y', 'Z'],
    });

    const handleClick = (event: Event) => {
      console.log(event);
    };

    return {
      state,
      handleClick,
    };
  },
});
</script>
<style lang="less">
.component-wrap{
  height: calc(100vh - 50px);
}
</style>
