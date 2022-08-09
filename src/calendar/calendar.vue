<template>
  <div>calendar</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import config from '../config';
import props from './props';

const { prefix } = config;
const name = `${prefix}-calendar`;

export default defineComponent({
  name,
  props: {
    ...props,
  },
  setup() {
    return {
      name,
    };
  },
});
</script>

<style scoped></style>
