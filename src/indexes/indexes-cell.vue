<template>
  <div :data-value="state.value" :class="`${name}__cell`" @click="handleClick">
    <div :class="`${name}__cell-text`">{{state.title}}</div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;

const name = `${prefix}-indexes`;

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
      title: props.title,
      value: props.value,
    });

    const handleClick = () => {
      emit('click', {
        value: props.value,
      });
    };

    return {
      name,
      state,
      handleClick,
      currentSidebar,
    };
  },
});
</script>
