<template>
  <t-cell-group :class="state.componentName" :data-index="state.index" :title="state.title" />
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import config from '../config';
import TCellGroup from '../cell-group';

const { prefix } = config;
const componentName = `${prefix}-indexes-anchor`;

export default defineComponent({
  name: componentName,
  components: { TCellGroup },
  props: {
    index: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = reactive({
      componentName,
      index: props.index || '',
      title: props.title ? props.title : props.index,
    });
    return {
      state,
    };
  },
});
</script>
