<template>
  <div :class="state.componentName" :data-index="state.index">{{ state.title }}</div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;

export default defineComponent({
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
