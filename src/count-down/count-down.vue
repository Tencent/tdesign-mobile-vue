<template>
  <div :class="`${name}`">
    <p v-if="!time">{{ content }}</p>
    <template v-if="time">
      <template v-for="item in showTimes" :key="item.mark">
        <span>{{ item.value }}</span>
        <label v-if="item.mark">{{ item.mark }}</label>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import config from '../config';
import CountDownProps from './props';
import { useCountDown } from '../shared/useCountDown';

const { prefix } = config;
const name = `${prefix}-countdown`;

export default defineComponent({
  name,
  props: {
    ...CountDownProps,
  },
  setup(props) {
    const { content, ...other } = props || {};
    //
    const { showTimes } = useCountDown(other);
    // return
    return {
      name,
      showTimes,
      content: props?.content,
    };
  },
});
</script>
