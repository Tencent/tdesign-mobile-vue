<template>
  <t-cell-group :class="state.componentName" :data-index="state.index" :title="state.title" />
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;

export default defineComponent({
  name: `${prefix}-indexes-anchor`,
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
      componentName: `${prefix}-indexes__anchor`,
      index: props.index || '',
      title: props.title ? props.title : props.index,
    });
    return {
      state,
    };
  },
});
</script>
