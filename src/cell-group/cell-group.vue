<template>
  <div :class="styleWrapper">
    <slot name="title">
      <div v-if="title" :class="styleTitle">{{ title }}</div>
    </slot>
    <div :class="styleContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-cell-group`;

export default defineComponent({
  name,
  props: {
    title: String,
    border: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const styleWrapper = ref(name);
    const styleContainer = computed(() => (props.border ? `${name}-container border--top-bottom` : `${name}-container`));
    const styleTitle = ref(`${name}--title`);

    return {
      styleWrapper,
      styleContainer,
      styleTitle,
    };
  },
});
</script>
