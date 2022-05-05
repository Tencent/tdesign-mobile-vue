<template>
  <div v-if="!showIndexes" class="tdesign-mobile-demo">
    <h1 class="title">DropdownMenu 下拉菜单</h1>
    <p class="summary">向下弹出的菜单列表</p>
    <tdesign-demo-block title="01 类型" summary="单选下拉菜单">
      <div class="indexes-demo">
        <t-button size="large" variant="outline" @click="handleClick('letter')"> 字母索引 </t-button>
        <t-button size="large" variant="outline" @click="handleClick('number')"> 数字索引 </t-button>
      </div>
    </tdesign-demo-block>
  </div>
  <demo-indexes v-else-if="showIndexes" :type="type"></demo-indexes>
</template>
<script lang="ts">
import { toRefs } from '@vueuse/core';
import { defineComponent, reactive } from 'vue';
import DemoIndexes from './demo-indexes.vue';

export default defineComponent({
  components: {
    DemoIndexes,
  },
  setup() {
    const state = reactive({
      showIndexes: false,
      type: 'letter',
    });

    const handleClick = (type = 'letter') => {
      state.showIndexes = true;
      state.type = type;
    };

    return {
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>
<style lang="less">
.indexes-demo {
  margin: 0 16px;
  .t-button {
    margin-bottom: 16px;
  }
}
</style>
