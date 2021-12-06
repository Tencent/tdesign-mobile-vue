<template>
  <t-cell :data-key="state.key" :title="state.title" :value="state.value" :link="state.link" @click="handleClick" />
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import config from '../config';

const { prefix } = config;

const name = `${prefix}-indexes-cell`;

export default defineComponent({
  name,
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
    const { emit } = context;
    const state = reactive({
      title: props.title,
      value: props.value,
      link: props.link,
      key: props.key,
    });

    const handleClick = () => {
      emit('click', {
        key: props.key,
        value: props.value,
        title: props.title,
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
