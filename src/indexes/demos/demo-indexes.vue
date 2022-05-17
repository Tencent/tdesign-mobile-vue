<template>
  <div class="component-wrap">
    <t-indexes :list="state.list" @select="onSelect"> </t-indexes>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { letter, number } from './data';
import Toast from '../../toast';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'list',
    },
  },
  setup(props) {
    const state = reactive({
      list: letter,
    });
    if (props.type === 'number') {
      state.list = number;
    }
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
