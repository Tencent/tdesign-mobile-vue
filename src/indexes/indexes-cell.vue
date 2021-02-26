<template>
  <div :data-value="state.value" :class="state.componentName" @click="handleClick">
    {{state.title}}
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const currentSidebar = '';
    const { emit } = context;
    const state = reactive({
      componentName: `${prefix}-indexes__cell`,
      title: props.title,
      value: props.value,
    });

    const handleClick = () => {
      emit('click', {
        value: props.value,
      });
    };

    return {
      state,
      handleClick,
      currentSidebar,
    };
  },
});
</script>
