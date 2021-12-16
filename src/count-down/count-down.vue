<template>
  <div :class="`${name}`">
    <p v-if="!time">
      <t-node :content="contentLayout"></t-node>
    </p>
    <template v-if="time">
      <template v-for="item in showTimes" :key="item.mark">
        <span>{{ item.value }}</span>
        <label v-if="item.mark">{{ item.mark }}</label>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';
import config from '../config';
import CountDownProps from './props';
import { useCountDown } from '../shared/useCountDown';
import { renderTNode, TNode } from '@/shared';

const { prefix } = config;
const name = `${prefix}-countdown`;

export default defineComponent({
  name,
  components: { TNode },
  props: {
    ...CountDownProps,
  },
  setup(props) {
    const { content, ...other } = props || {};
    //
    const { time, showTimes } = useCountDown(other);
    const internalInstance = getCurrentInstance();
    const contentLayout = computed(() => renderTNode(internalInstance, 'content'));
    // return
    return {
      name,
      time,
      showTimes,
      contentLayout,
    };
  },
});
</script>
