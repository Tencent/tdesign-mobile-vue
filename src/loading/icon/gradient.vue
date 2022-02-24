<template>
  <svg :class="classes" viewBox="0 0 14 14" version="1.1" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
    <foreignObject x="1" y="1" width="12" height="12">
      <div ref="circle" :class="`${name}-conic`" />
    </foreignObject>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import circleAdapter from '../../_common/js/loading/circle-adapter';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-loading__gradient`;
const classname = `${prefix}-icon-loading`;

export default defineComponent({
  name,
  setup() {
    const classes = [name, classname];
    return {
      name,
      classes,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.updateColor();
    });
  },
  updated() {
    this.updateColor();
  },
  methods: {
    updateColor() {
      const circleElem = this.$refs.circle as HTMLElement;
      circleAdapter(circleElem);
    },
  },
});
</script>
