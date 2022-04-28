<template>
  <t-cell
    :class="state.componentName"
    :data-key="state.key"
    :title="state.title"
    :value="state.value"
    :link="state.link"
  />
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import TCell from '../cell';
import config from '../config';

const { prefix } = config;

const componentName = `${prefix}-indexes-cell`;

export default defineComponent({
  name: componentName,
  components: { TCell },
  props: {
    title: {
      type: String,
      default: '',
    },
    key: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    link: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const currentSidebar = '';
    const state = reactive({
      title: props.title,
      value: props.value,
      link: props.link,
      key: props.key,
      componentName,
    });

    return {
      state,
      currentSidebar,
    };
  },
});
</script>
